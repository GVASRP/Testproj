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
  MessageSquare
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* ШАПКА */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              GO
            </div>
            <span className="font-extrabold text-lg text-slate-900">
              RouteHub
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuth ? (
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <button onClick={() => setIsAuth(false)} className="p-1 text-slate-400 hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsAuth(true)} className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg">
                Вход
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <h2 className="font-bold uppercase tracking-wider text-[10px]">Умный маршрутизатор</h2>
            </div>
            <h3 className="text-lg font-bold mb-2">Создать маршрут по описанию</h3>
            <p className="text-slate-300 text-xs mb-3">Укажите пожелания — алгоритм построит удобный трек.</p>
            
            <textarea 
              rows={3} 
              placeholder="Например: Спокойная поездка вдоль реки на велах с остановкой..." 
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none mb-3 resize-none"
            />
            
            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 font-medium rounded-xl text-xs flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Сгенерировать
            </button>
          </section>

          <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" /> Интерактивная карта
            </h3>
            <div className="w-full h-36 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
              <div className="text-center">
                <Compass className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                <span>Карта точек и маршрутов</span>
              </div>
            </div>
          </section>
        </aside>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Голосование</span>
                <h2 className="text-lg font-bold text-slate-900">Куда едем на выходных?</h2>
              </div>
              <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg">
                <PlusCircle className="w-3.5 h-3.5" /> Свой вариант
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Велозаезд + Барбекю</h4>
                  <p className="text-xs text-slate-500">Старт в 12:00 на Набережной</p>
                </div>
                <button className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg">
                  Голосовать (12)
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Рыбалка у затона</h4>
                  <p className="text-xs text-slate-500">Выезд утренний в 5:00</p>
                </div>
                <button className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg">
                  Голосовать (5)
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" /> Общий чат
            </h3>
            <div className="h-28 bg-slate-50 rounded-xl p-3 text-xs space-y-2 mb-3 border border-slate-100">
              <div><span className="font-bold">Макс:</span> Во сколько точно стартуем?</div>
              <div><span className="font-bold text-indigo-600">Timas:</span> В 12:00 от главного входа!</div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Сообщение..." 
                className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
              />
              <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold">
                Отправить
              </button>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
