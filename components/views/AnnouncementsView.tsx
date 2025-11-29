import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

const AnnouncementsView: React.FC = () => {
  const news = [
    { id: 1, title: 'Изменения в расписании групп RPO-22', date: '25 Мая 2024', preview: 'В связи с проведением технического обслуживания оборудования в аудитории 304, занятия переносятся...', type: 'Важно', read: false },
    { id: 2, title: 'Хакатон "Code The Future" 2024', date: '23 Мая 2024', preview: 'Открыта регистрация на ежегодный хакатон. Главный приз - стажировка в ведущей IT компании и денежный грант.', type: 'Мероприятие', read: true },
    { id: 3, title: 'Технические работы на портале', date: '20 Мая 2024', preview: 'В ночь с субботы на воскресенье будут проводиться работы. Дневник может быть недоступен с 02:00 до 05:00.', type: 'Инфо', read: true },
    { id: 4, title: 'Встреча с экспертом из Yandex', date: '18 Мая 2024', preview: 'Приглашаем всех желающих на открытую лекцию по архитектуре высоконагруженных систем.', type: 'Лекция', read: true },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Объявления</h1>
        <p className="text-text-muted mt-1">Новости академии и важные уведомления</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {news.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass p-6 rounded-2xl relative overflow-hidden group hover:bg-bg-paper transition-all cursor-pointer border-l-4 ${!item.read ? 'border-l-primary' : 'border-l-transparent'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                item.type === 'Важно' ? 'bg-red-500/10 text-red-500' : 
                item.type === 'Мероприятие' ? 'bg-purple-500/10 text-purple-500' : 
                'bg-blue-500/10 text-blue-500'
              }`}>
                {item.type}
              </span>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <Calendar className="w-3 h-3" />
                {item.date}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-text-muted text-sm line-clamp-2">{item.preview}</p>
            
            <div className="mt-4 flex justify-end">
              <button className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                Читать далее <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            {!item.read && (
               <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsView;