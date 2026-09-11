import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Vote, 
  MessageSquare, 
  Sparkles, 
  Fish, 
  Bell, 
  PlusCircle, 
  User, 
  LogOut,
  Star,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- ШАПКА / НАВИГАЦИЯ --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Логотип */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md border-b-2 border-indigo-900">
              GO
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              RouteHub <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-mono">v1.0</span>
            </span>
          </div>

          {/* Главное меню */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'explore' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Обзор & Карта
            </button>
            <button 
              onClick={() => setActiveTab('voting')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'voting' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Голосования
            </button>
            <button 
              onClick={() => setActiveTab('ai-builder')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'ai-builder' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Sparkles className="w-4 h-4" />
              Конструктор
            </button>
          </nav>

          {/* Авторизация / Профиль & Уведомления */}
          <div className="flex items-center gap-3">
            {isAuth ? (
              <>
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Уведомления">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-300">
                  <div className="w-9 h-9 bg-slate-200 rounded-full border border-slate-400 flex items-center justify-center font-semibold text-slate-700">
                    TM
                  </div>
                  <button onClick={() => setIsAuth(false)} className="p-1 text-slate-400 hover:text-red-600">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Вход</button>
                <button className="px-3 py-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm">Регистрация</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ЛЕВАЯ КОЛОНКА: Виджеты и быстрый доступ (4 спана) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Блок Интеллектуального генератора маршрутов */}
          <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-700/50">
            <div className="flex items-center gap-2 mb-3 text-indigo-300">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-wider text-xs">Авто-маршрутизатор</h2>
            </div>
            <h3 className="text-xl font-bold mb-2">Создать маршрут по описанию</h3>
            <p className="text-slate-300 text-sm mb-4">Укажите пожелания или выберите итоги голосования — алгоритм за секунду построит трек.</p>
            
            <textarea 
              rows={3} 
              placeholder="Например: Спокойная поездка вдоль реки на велах, с остановкой на рыбалку..." 
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none"
            />
            
            <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.99] transition-all font-medium rounded-xl text-sm shadow-md flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Сгенерировать план
            </button>
          </section>

          {/* Кастомная интерактивная карта (Превью) */}
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> Карта локаций
              </h3>
              <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">Открыть во весь экран &rarr;</span>
            </div>
            
            {/* Заглушка под интерактивную карту */}
            <div className="w-full h-48 bg-slate-200 rounded-xl border border-slate-300 relative overflow-hidden flex items-center justify-center text-slate-500 group cursor-pointer">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
              <div className="z-10 text-center">
                <Compass className="w-8 h-8 mx-auto mb-1 text-slate-400 group-hover:rotate-45 transition-transform duration-300" />
                <span className="text-xs font-semibold text-slate-600">Нажмите для просмотра точки & маршрутов</span>
              </div>
            </div>
          </section>

          {/* Готовые советы и споты */}
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Fish className="w-5 h-5 text-emerald-600" /> Проверенные точки и лайфхаки
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Рыбалка</span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800">Затон у протоки</h4>
                <p className="text-xs text-slate-500 mt-1">Отличное место под поплавок. Окунь, карась. Лучше приходить до 7 утра.</p>
              </div>
            </div>
          </section>

        </aside>

        {/* ПРАВАЯ КОЛОНКА: Лента голосований, созданных маршрутов и чата (8 спанов) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Блок активного голосования за мероприятия */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Активное событие</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Куда едем на этих выходных?</h2>
                <p className="text-sm text-slate-500">Голосуйте за вариант или добавляйте свой маршрут.</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-200 transition-colors">
                <PlusCircle className="w-4 h-4" /> Добавить вариант
              </button>
            </div>

            {/* Список вариантов для голосования */}
            <div className="space-y-3 mb-6">
              
              {/* Вариант 1 */}
              <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-base">Велозаезд + Барбекю на набережной</h4>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">25 км</span>
                  </div>
                  <p className="text-xs text-slate-600">Старт в 12:00. Маршрут включает 3 остановки на живописных спотах.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="px-4 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
                    Голосовать (12)
                  </button>
                  <span className="text-[10px] text-slate-400">Автор: Timas</span>
                </div>
              </div>

              {/* Вариант 2 */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-base">Утренняя рыбалка на прудах</h4>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">Пеший</span>
                  </div>
                  <p className="text-xs text-slate-600">Тихий выезд с ночёвкой или ранним выездом в 5:00.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg active:scale-95 transition-all">
                    Голосовать (5)
                  </button>
                  <span className="text-[10px] text-slate-400">Автор: Alex</span>
                </div>
              </div>

            </div>

            {/* Опции управления для организаторов / авторов */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Всего проголосовало: 17 человек</span>
              <div className="flex gap-3">
                <button className="hover:text-slate-600 underline">Изменить варианты</button>
                <button className="hover:text-red-600 underline">Удалить сборы</button>
              </div>
            </div>
          </section>

          {/* Готовые подборки поездок и маршрутов */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Популярные готовые маршруты</h3>
              <button className="text-xs font-semibold text-indigo-600 hover:underline">Смотреть все</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Карточка маршрута 1 */}
              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Велосипед</span>
                  <div className="flex items-center text-xs font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 mr-1" /> 4.8
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Кольцо у реки & Парковый спот</h4>
                <p className="text-xs text-slate-500 mb-3">Длина 20 км. Отличный асфальт, минимальный перепад высот.</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 text-slate-400">
                  <span>Добавлено сообществом</span>
                  <button className="text-indigo-600 font-semibold hover:underline">Детали &rarr;</button>
                </div>
              </div>

              {/* Карточка маршрута 2 */}
              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">Авто / Загород</span>
                  <div className="flex items-center text-xs font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 mr-1" /> 5.0
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Выезд выходного дня: Озеро & Лес</h4>
                <p className="text-xs text-slate-500 mb-3">Маршрут на 60 км с точками под палатки и мангалы.</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 text-slate-400">
                  <span>Сформировано алгоритмом</span>
                  <button className="text-indigo-600 font-semibold hover:underline">Детали &rarr;</button>
                </div>
              </div>

            </div>
          </section>

          {/* Быстрый Общий Чат / Обсуждение */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" /> Общий чат участников
            </h3>
            
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-200 p-3 overflow-y-auto space-y-2 mb-3">
              <div className="text-xs">
                <span className="font-bold text-slate-800">Макс:</span> <span className="text-slate-600">Во сколько точно стартуем в субботу?</span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-indigo-600">Timas:</span> <span className="text-slate-600">В 12:00 от главного входа, в голосовании всё написано!</span>
              </div>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Написать сообщение в чат..." 
                className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors">
                Отправить
              </button>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
