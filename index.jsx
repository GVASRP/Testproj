import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { RotateCw, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RefreshCw } from 'lucide-react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOS = {
  I: { shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]], color: '#00f0f0' },
  J: { shape: [[1,0,0], [1,1,1], [0,0,0]], color: '#0000f0' },
  L: { shape: [[0,0,1], [1,1,1], [0,0,0]], color: '#f0a000' },
  O: { shape: [[1,1], [1,1]], color: '#f0f000' },
  S: { shape: [[0,1,1], [1,1,0], [0,0,0]], color: '#00f000' },
  T: { shape: [[0,1,0], [1,1,1], [0,0,0]], color: '#a000f0' },
  Z: { shape: [[1,1,0], [0,1,1], [0,0,0]], color: '#f00000' }
};

const getRandomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOS[randKey], type: randKey };
};

const createEmptyBoard = () => 
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isPausedRef = useRef(isPaused);
  const gameOverRef = useRef(gameOver);
  isPausedRef.current = isPaused;
  gameOverRef.current = gameOver;

  // Инициализация первой игры
  const startGame = () => {
    const first = getRandomTetromino();
    const second = getRandomTetromino();
    setBoard(createEmptyBoard());
    setCurrentPiece(first);
    setNextPiece(second);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - Math.ceil(first.shape[0].length / 2), y: 0 });
    setScore(0);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  // Проверка столкновений
  const checkCollision = useCallback((piece, pos, boardState = board) => {
    if (!piece) return false;
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] !== 0) {
          const newX = pos.x + c;
          const newY = pos.y + r;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }
          if (newY >= 0 && boardState[newY][newX] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  // Движение влево / вправо
  const move = (dir) => {
    if (gameOver || isPaused || !currentPiece) return;
    const newPos = { ...position, x: position.x + dir };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    }
  };

  // Поворот фигуры
  const rotate = () => {
    if (gameOver || isPaused || !currentPiece) return;
    const shape = currentPiece.shape;
    const rotatedShape = shape[0].map((_, index) => shape.map(row => row[index]).reverse());
    const rotatedPiece = { ...currentPiece, shape: rotatedShape };

    if (!checkCollision(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    } else if (!checkCollision(rotatedPiece, { ...position, x: position.x - 1 })) {
      setPosition(p => ({ ...p, x: p.x - 1 }));
      setCurrentPiece(rotatedPiece);
    } else if (!checkCollision(rotatedPiece, { ...position, x: position.x + 1 })) {
      setPosition(p => ({ ...p, x: p.x + 1 }));
      setCurrentPiece(rotatedPiece);
    }
  };

  // Фиксация фигуры и удаление заполненных линий
  const lockPiece = useCallback((piece, pos) => {
    const newBoard = board.map(row => [...row]);
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] !== 0) {
          if (pos.y + r < 0) {
            setGameOver(true);
            return;
          }
          newBoard[pos.y + r][pos.x + c] = piece.color;
        }
      }
    }

    // Проверка заполненных линий
    let clearedLines = 0;
    const updatedBoard = newBoard.filter(row => {
      const isFull = row.every(cell => cell !== 0);
      if (isFull) clearedLines++;
      return !isFull;
    });

    while (updatedBoard.length < BOARD_HEIGHT) {
      updatedBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    if (clearedLines > 0) {
      const linePoints = [0, 100, 300, 500, 800];
      setScore(s => s + (linePoints[clearedLines] || clearedLines * 200));
      setLines(l => l + clearedLines);
    }

    setBoard(updatedBoard);

    // Берем следующую фигуру
    const spawnPos = { x: Math.floor(BOARD_WIDTH / 2) - Math.ceil(nextPiece.shape[0].length / 2), y: 0 };
    if (checkCollision(nextPiece, spawnPos, updatedBoard)) {
      setGameOver(true);
    } else {
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomTetromino());
      setPosition(spawnPos);
    }
  }, [board, nextPiece, checkCollision]);

  // Падение фигуры на 1 клетку вниз
  const drop = useCallback(() => {
    if (gameOverRef.current || isPausedRef.current || !currentPiece) return;
    const newPos = { ...position, y: position.y + 1 };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    } else {
      lockPiece(currentPiece, position);
    }
  }, [currentPiece, position, checkCollision, lockPiece]);

  // Быстрый сброс в самый низ (Hard Drop)
  const hardDrop = () => {
    if (gameOver || isPaused || !currentPiece) return;
    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 })) {
      newY++;
    }
    lockPiece(currentPiece, { x: position.x, y: newY });
  };

  // Таймер автоматического падения
  useEffect(() => {
    const speed = Math.max(100, 800 - Math.floor(lines / 5) * 50);
    const interval = setInterval(() => {
      drop();
    }, speed);
    return () => clearInterval(interval);
  }, [drop, lines]);

  // Отрисовка игрового поля с текущей падающей фигурой
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    if (currentPiece && !gameOver) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c] !== 0) {
            const y = position.y + r;
            const x = position.x + c;
            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
              displayBoard[y][x] = currentPiece.color;
            }
          }
        }
      }
    }
    return displayBoard;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-between p-2 select-none">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ: Очки, пауза и сброс */}
      <header className="w-full max-w-xs flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-lg mt-1">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Счёт</div>
          <div className="text-xl font-black text-amber-400 font-mono">{score}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Линии</div>
          <div className="text-xl font-black text-cyan-400 font-mono">{lines}</div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-xl border border-slate-700 text-slate-200"
          >
            {isPaused ? <Play className="w-4 h-4 text-green-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>
          <button 
            onClick={startGame} 
            className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-xl border border-slate-700 text-slate-200"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ИГРОВОЕ ПОЛЕ И ПРЕВЬЮ СЛЕДУЮЩЕЙ ФИГУРЫ */}
      <div className="flex gap-2 my-auto items-start">
        
        {/* Сетка Тетриса */}
        <div className="relative bg-slate-900 border-2 border-slate-700 rounded-lg p-1 grid grid-cols-10 gap-0.5 shadow-2xl">
          {renderBoard().map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm border border-black/20"
                style={{
                  backgroundColor: cell || '#0f172a',
                  boxShadow: cell ? 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.4)' : 'none'
                }}
              />
            ))
          )}

          {/* Экран Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-4 text-center">
              <h2 className="text-2xl font-extrabold text-red-500 mb-1">ИГРА ОКОНЧЕНА</h2>
              <p className="text-xs text-slate-400 mb-4">Финишный счёт: <span className="text-amber-400 font-bold">{score}</span></p>
              <button 
                onClick={startGame}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-xs flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> ИГРАТЬ СНОВА
              </button>
            </div>
          )}

          {/* Экран Паузы */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold tracking-widest text-amber-400 uppercase">ПАУЗА</span>
            </div>
          )}
        </div>

        {/* Панель следующей фигуры */}
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex flex-col items-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase mb-2">Далее</span>
          <div className="grid grid-cols-4 gap-0.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => {
                let color = '#0f172a';
                if (nextPiece && nextPiece.shape[r] && nextPiece.shape[r][c]) {
                  color = nextPiece.color;
                }
                return (
                  <div
                    key={`next-${r}-${c}`}
                    className="w-3.5 h-3.5 rounded-sm"
                    style={{
                      backgroundColor: color,
                      boxShadow: color !== '#0f172a' ? 'inset 1px 1px 2px rgba(255,255,255,0.4)' : 'none'
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* СЕНСОРНОЕ УПРАВЛЕНИЕ ДЛЯ ТЕЛЕФОНА */}
      <footer className="w-full max-w-xs flex flex-col gap-2 mb-2">
        
        {/* Кнопки Влево / Поворот / Вправо */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => move(-1)}
            className="h-14 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 active:scale-95 border border-slate-700 rounded-2xl flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-7 h-7 text-slate-200" />
          </button>

          <button 
            onClick={rotate}
            className="h-14 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:scale-95 border border-indigo-400 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <RotateCw className="w-7 h-7 text-white" />
          </button>

          <button 
            onClick={() => move(1)}
            className="h-14 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 active:scale-95 border border-slate-700 rounded-2xl flex items-center justify-center shadow-md"
          >
            <ArrowRight className="w-7 h-7 text-slate-200" />
          </button>
        </div>

        {/* Кнопки Вниз / Мгновенное падение (Hard Drop) */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={drop}
            className="h-12 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 active:scale-95 border border-slate-700 rounded-2xl flex items-center justify-center gap-1 text-xs font-bold text-slate-300"
          >
            <ArrowDown className="w-5 h-5" /> Ускорить
          </button>

          <button 
            onClick={hardDrop}
            className="h-12 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-95 border border-amber-300 text-slate-950 rounded-2xl flex items-center justify-center font-extrabold text-xs tracking-wider shadow-md"
          >
            УРОНИТЬ
          </button>
        </div>

      </footer>

    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
          
