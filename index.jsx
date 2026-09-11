import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  MapPin, 
  Navigation, 
  Sparkles, 
  Fish, 
  Bell, 
  PlusCircle, 
  LogOut,
  Star,
  Compass,
  MessageSquare,
  HelpCircle,
  ThumbsUp,
  Folder,
  Globe
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="min-h-screen bg-[#ece9d8] text-black font-['Tahoma',_sans-serif] text-xs p-2 sm:p-4">
      
      {/* ОБОЛОЧКА В СТИЛЕ СТАРОГО ОКНА WINTEL */}
      <div className="max-w-6xl mx-auto border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] shadow-2xl p-1">
        
        {/* Заголовок окна (Window Titlebar) */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#2884eb] to-[#005ae2] text-white px-3 py-1 font-bold flex justify-between items-center text-sm shadow-inner rounded-t-sm">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>RouteHub Portal 2005 v2.1 -- [Главное Меню]</span>
          </div>
          <div className="flex gap-1">
            <button className="w-5 h-5 bg-[#ece9d8] text-black font-bold border border-white border-b-black border-r-black flex items-center justify-center text-xs active:border-t-black active:border-l-black">_</button>
            <button className="w-5 h-5 bg-[#ece9d8] text-black font-bold border border-white border-b-black border-r-black flex items-center justify-center text-xs active:border-t-black active:border-l-black">□</button>
            <button className="w-5 h-5 bg-[#e81123] text-white font-bold border border-white border-b-black border-r-black flex items-center justify-center text-xs">✕</button>
          </div>
        </div>

        {/* Шапка / Баннер в стиле 2000-х */}
        <header className="my-2 p-3 bg-gradient-to-b from-[#1b58b8] to-[#082e6e] text-white border-2 border-black rounded-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 z-10 relative">
            <div>
              <h1 className="text-2xl font-extrabold italic tracking-wider text-yellow-300 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                ★ ROUTEHUB.RU ★
              </h1>
              <p className="text-[11px] text-cyan-200 font-mono">
                Интерактивный портал поездок, маршрутов и тусовок!
              </p>
            </div>

            {/* Блок Входа / Профиля */}
            <div className="bg-[#ece9d8] text-black p-2 border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] rounded flex items-center gap-3">
              {isAuth ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block border border-black"></span>
                    <span className="font-bold text-blue-900">User: Timas_007</span>
                  </div>
                  <button 
                    onClick={() => setIsAuth(false)} 
                    className="px-2 py-0.5 bg-[#d4d0c8] border border-t-white border-l-white border-r-black border-b-black font-semibold hover:bg-red-100 flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" /> Выйти
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuth(true)} 
                  className="px-3 py-1 bg-yellow-300 border-2 border-t-white border-l-white border-r-black border-b-black font-bold uppercase tracking-wider text-black hover:bg-yellow-200"
                >
                  [ Вход / Регистрация ]
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Бегущая строка (Классический маркер 2000-х) */}
        <div className="bg-black text-green-400 font-mono p-1 mb-2 border border-gray-600 text-xs overflow-hidden flex items-center gap-2">
          <span className="bg-red-600 text-white font-bold px-1 text-[10px]">NEWS</span>
          <marquee scrollamount="5" className="whitespace-nowrap">
            ::: Добро пожаловать на RouteHub! ::: Голосуем за лучший маршрут выходных ::: Добавляйте свои тайные точки для рыбалки ::: Интеллектуальный конструктор поездок готов к работе :::
          </marquee>
        </div>

        {/* Навигационное меню в стиле вкладок IE6 */}
        <nav className="flex gap-1 mb-3 border-b-2 border-[#716f64] px-1">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-1.5 font-bold border-t-2 border-x-2 rounded-t ${activeTab === 'explore' ? 'bg-[#ece9d8] border-t-white border-l-white border-r-black text-blue-900 -mb-[2px] pb-2' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black text-gray-700'}`}
          >
            🗺 Обзор & Карта
          </button>
          <button 
            onClick={() => setActiveTab('voting')}
            className={`px-4 py-1.5 font-bold border-t-2 border-x-2 rounded-t ${activeTab === 'voting' ? 'bg-[#ece9d8] border-t-white border-l-white border-r-black text-blue-900 -mb-[2px] pb-2' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black text-gray-700'}`}
          >
            📊 Голосование
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-1.5 font-bold border-t-2 border-x-2 rounded-t flex items-center gap-1 ${activeTab === 'ai' ? 'bg-[#ece9d8] border-t-white border-l-white border-r-black text-blue-900 -mb-[2px] pb-2' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black text-gray-700'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Умный Мастер
          </button>
        </nav>

        {/* ОСНОВНАЯ СЕТКА СТРАНИЦЫ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* ЛЕВАЯ КОЛОНКА (4 спана) */}
          <aside className="md:col-span-4 flex flex-col gap-3">
            
            {/* Блок Умного Генератора */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#d4d0c8] p-3 shadow">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-1.5 mb-2 font-bold flex items-center justify-between">
                <span>⚡ УМНЫЙ КОНСТРУКТОР</span>
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <p className="text-gray-800 mb-2 leading-tight">
                Введи свои пожелания — система автоматически сформирует оптимальный план поездки!
              </p>
              
              <textarea 
                rows={3} 
                placeholder="Пример: Поездка вдоль реки на 20 км, выезд в 10 утра, остановка на шашлык..." 
                className="w-full bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2 text-xs font-mono focus:outline-none mb-2 resize-none"
              />
              
              <button className="w-full py-1.5 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-500 border-2 border-t-white border-l-white border-r-black border-b-black font-bold text-black hover:brightness-110 active:border-t-black active:border-l-black flex items-center justify-center gap-1 shadow">
                <Navigation className="w-3.5 h-3.5" /> СГЕНЕРИРОВАТЬ МАРШРУТ
              </button>
            </div>

            {/* Карты и Локации */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] p-3">
              <div className="bg-[#000080] text-white p-1 font-bold mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-yellow-300" /> КАРТА НАВИГАЦИИ
              </div>
              
              {/* Заглушка под карту Web 2.0 */}
              <div className="w-full h-40 bg-[#002b36] border-2 border-t-black border-l-black border-r-white border-b-white relative overflow-hidden flex flex-col items-center justify-center text-cyan-400 p-2 text-center">
                <Compass className="w-8 h-8 mb-1 text-yellow-400 animate-bounce" />
                <span className="font-mono text-[10px] text-green-300">[ GPS: ACTIVE ]</span>
                <span className="text-[11px] font-bold text-white mt-1">Интерактивные точки и слои</span>
              </div>
            </div>

            {/* Тайные места / Рыбалка */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] p-3">
              <div className="bg-emerald-800 text-white p-1 font-bold mb-2 flex items-center gap-1">
                <Fish className="w-3.5 h-3.5 text-green-300" /> РЫБАЛКА & ТОЧКИ
              </div>
              
              <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2 mb-2">
                <div className="flex justify-between items-center border-b border-gray-300 pb-1 mb-1">
                  <span className="font-bold text-blue-900">Затон у протоки</span>
                  <span className="bg-yellow-300 text-black px-1 font-mono font-bold text-[10px]">★ 4.9</span>
                </div>
                <p className="text-gray-600 text-[11px]">Клюет карась и окунь. Подъезд хороший, берег чистый.</p>
              </div>
            </div>

          </aside>

          {/* ПРАВАЯ КОЛОНКА (8 спанов) */}
          <main className="md:col-span-8 flex flex-col gap-3">
            
            {/* Блок Голосования */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] p-3 shadow">
              <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white p-1.5 font-bold flex justify-between items-center mb-3">
                <span>📊 ГОЛОСОВАНИЕ ЗА МЕРОПРИЯТИЕ ВЫХОДНЫХ</span>
                <span className="text-[10px] bg-red-600 px-1 text-white uppercase font-mono">HOT</span>
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 p-2 mb-3 text-gray-800">
                <h2 className="font-bold text-sm text-blue-900">Тема: Куда отправляемся в эту субботу?</h2>
                <p className="text-[11px] text-gray-600">Голосуйте за предложенные варианты или добавляйте свои маршруты!</p>
              </div>

              {/* Список ответов */}
              <div className="space-y-2 mb-3">
                
                {/* Вариант 1 */}
                <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-900 text-sm">1. Велозаезд + Барбекю на Набережной</span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] px-1 font-mono font-bold">25 км</span>
                    </div>
                    <p className="text-gray-500 text-[11px]">Старт в 12:00. Маршрут включает 3 остановки на спотах.</p>
                  </div>
                  <button className="px-3 py-1 bg-gradient-to-b from-green-300 to-green-600 text-white font-bold border border-black hover:brightness-110 active:translate-y-0.5">
                    ГОЛОС (12)
                  </button>
                </div>

                {/* Вариант 2 */}
                <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-sm">2. Утренняя рыбалка на загородных прудах</span>
                      <span className="bg-gray-200 text-gray-700 text-[10px] px-1 font-mono">Пеший</span>
                    </div>
                    <p className="text-gray-500 text-[11px]">Выезд с ночёвкой или ранним выездом в 5:00 утра.</p>
                  </div>
                  <button className="px-3 py-1 bg-gradient-to-b from-gray-100 to-gray-300 text-black font-bold border border-black hover:bg-gray-200 active:translate-y-0.5">
                    ГОЛОС (5)
                  </button>
                </div>

              </div>

              {/* Кнопки управления */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-400">
                <button className="px-2 py-1 bg-[#d4d0c8] border-2 border-t-white border-l-white border-r-black border-b-black font-bold text-blue-900 hover:bg-white flex items-center gap-1">
                  <PlusCircle className="w-3.5 h-3.5" /> Добавить вариант
                </button>
                <button className="px-2 py-1 bg-[#d4d0c8] border-2 border-t-white border-l-white border-r-black border-b-black text-gray-700 hover:bg-white">
                  Редактировать
                </button>
                <button className="px-2 py-1 bg-[#d4d0c8] border-2 border-t-white border-l-white border-r-black border-b-black text-red-700 hover:bg-red-50">
                  Удалить
                </button>
              </div>
            </div>

            {/* Каталог готовых поездок */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] p-3">
              <div className="bg-[#000080] text-white p-1 font-bold mb-2 flex items-center justify-between">
                <span>📂 КАТАЛОГ ГОТОВЫХ МАРШРУТОВ</span>
                <span className="text-[10px] text-yellow-300 font-mono">Total: 42</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                
                <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2">
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-yellow-200 text-black font-bold px-1 text-[10px] border border-black">ВЕЛОСИПЕД</span>
                    <span className="font-bold text-yellow-600">★ 4.8</span>
                  </div>
                  <h3 className="font-bold text-blue-900 mb-1">Кольцо у реки & Парковый спот</h3>
                  <p className="text-gray-500 text-[11px] mb-2">Протяженность 20 км. Отличный асфальт.</p>
                  <a href="#" className="text-blue-700 underline font-bold hover:text-red-600">Подробнее &raquo;</a>
                </div>

                <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white p-2">
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-blue-200 text-black font-bold px-1 text-[10px] border border-black">АВТО / ТУРИЗМ</span>
                    <span className="font-bold text-yellow-600">★ 5.0</span>
                  </div>
                  <h3 className="font-bold text-blue-900 mb-1">Выезд: Озеро & Сосновый Лес</h3>
                  <p className="text-gray-500 text-[11px] mb-2">Маршрут на 60 км. Точки под палатки.</p>
                  <a href="#" className="text-blue-700 underline font-bold hover:text-red-600">Подробнее &raquo;</a>
                </div>

              </div>
            </div>

            {/* Мини-чат / Заметки */}
            <div className="border-2 border-t-white border-l-white border-r-[#716f64] border-b-[#716f64] bg-[#ece9d8] p-3">
              <div className="bg-[#000080] text-white p-1 font-bold mb-2 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-300" /> ОБЩИЙ ЧАТ УЧАСТНИКОВ
              </div>

              <div className="bg-white border-2 border-t-black border-l-black border-r-white border-b-white h-28 p-2 overflow-y-auto font-mono text-[11px] space-y-1 mb-2">
                <div><span className="font-bold text-blue-800">&lt;Max_99&gt;:</span> Народ, во сколько сбор на набережной?</div>
                <div><span className="font-bold text-red-700">&lt;Timas_007&gt;:</span> Ровно в 12:00! Смотрите в голосовании выше.</div>
                <div><span className="font-bold text-green-700">&lt;Alex_Fish&gt;:</span> Я удочки прихвачу, кто со мной после велозаезда?</div>
              </div>

              <div className="flex gap-1">
                <input 
                  type="text" 
                  placeholder="Введите сообщение..." 
                  className="flex-1 bg-white border-2 border-t-black border-l-black border-r-white border-b-white px-2 py-1 text-xs focus:outline-none"
                />
                <button className="px-3 py-1 bg-gradient-to-b from-[#ece9d8] to-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black font-bold active:border-t-black active:border-l-black">
                  ОТПРАВИТЬ
                </button>
              </div>
            </div>

          </main>

        </div>

        {/* Подвал сайта */}
        <footer className="mt-3 pt-2 border-t-2 border-[#716f64] text-center text-gray-600 text-[10px] font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>© 2005-2026 RouteHub Project Inc. Все права защищены.</div>
          <div className="flex gap-2">
            <span className="bg-black text-white px-1">Best viewed in 1024x768</span>
            <span className="bg-blue-900 text-white px-1">Made for Competition</span>
          </div>
        </footer>

      </div>

    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
