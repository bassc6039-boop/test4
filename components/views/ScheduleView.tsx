import React from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarRange } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleView: React.FC = () => {
  const days = ['Пн, 20', 'Вт, 21', 'Ср, 22', 'Чт, 23', 'Пт, 24', 'Сб, 25'];
  const weekSchedule = [
    [
        { subject: 'Системное прогр.', time: '08:30', room: '304', type: 'lec' },
        { subject: 'Базы данных', time: '10:15', room: '201', type: 'prac' }
    ],
    [
        { subject: 'Веб-разработка', time: '10:15', room: 'Comp 2', type: 'prac' },
        { subject: 'Английский', time: '12:00', room: '105', type: 'sem' }
    ],
    [
        { subject: 'Паттерны проект.', time: '08:30', room: '304', type: 'lec' },
        { subject: 'Физкультура', time: '13:45', room: 'Gym', type: 'sem' }
    ],
    [
        { subject: 'Базы данных', time: '08:30', room: '201', type: 'lec' },
        { subject: 'Системное прогр.', time: '10:15', room: 'Comp 1', type: 'prac' },
        { subject: 'Менеджмент', time: '12:00', room: '405', type: 'lec' }
    ],
    [
        { subject: 'Веб-разработка', time: '10:15', room: 'Comp 2', type: 'prac' }
    ],
    [] // Saturday
  ];

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-3xl font-bold text-text-main">Расписание</h1>
             <p className="text-text-muted mt-1">Просмотр занятий и аудиторий</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mt-4 md:mt-0"
          >
             <div className="glass flex items-center p-1 rounded-xl">
                 <button className="p-2 hover:bg-bg-paper rounded-lg text-text-muted hover:text-text-main transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                 <span className="px-4 text-sm font-medium text-text-main flex items-center gap-2">
                    <CalendarRange className="w-4 h-4 text-primary" />
                    20 Мая - 26 Мая
                 </span>
                 <button className="p-2 hover:bg-bg-paper rounded-lg text-text-muted hover:text-text-main transition-colors"><ChevronRight className="w-5 h-5" /></button>
             </div>
             <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">Сегодня</button>
          </motion.div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {days.map((day, dayIndex) => (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
                key={day} 
                className="flex flex-col gap-3"
             >
                 <div className={`text-center py-3 rounded-xl font-bold text-sm border ${
                     dayIndex === 1 
                     ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                     : 'glass text-text-muted border-border'
                 }`}>
                     {day}
                 </div>
                 <div className="space-y-3 min-h-[300px]">
                     {weekSchedule[dayIndex]?.length > 0 ? (
                         weekSchedule[dayIndex].map((lesson, i) => (
                             <motion.div 
                                whileHover={{ scale: 1.02, y: -2 }}
                                key={i} 
                                className="glass p-3 rounded-2xl relative overflow-hidden group cursor-pointer"
                             >
                                 <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                     lesson.type === 'lec' ? 'bg-purple-500' : 
                                     lesson.type === 'prac' ? 'bg-blue-500' : 'bg-green-500'
                                 }`}></div>
                                 <div className="pl-3">
                                     <div className="text-xs text-text-muted flex items-center gap-1 mb-1.5 font-medium opacity-80">
                                         <Clock className="w-3 h-3" />
                                         {lesson.time}
                                     </div>
                                     <div className="font-bold text-text-main text-sm leading-snug mb-2">{lesson.subject}</div>
                                     <div className="text-xs text-text-muted flex items-center gap-1">
                                         <MapPin className="w-3 h-3" />
                                         {lesson.room}
                                     </div>
                                 </div>
                             </motion.div>
                         ))
                     ) : (
                         <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-2xl opacity-50">
                             <span className="text-xs text-text-muted">Нет занятий</span>
                         </div>
                     )}
                 </div>
             </motion.div>
          ))}
       </div>
       
       <div className="flex flex-wrap gap-6 mt-6 text-sm text-text-muted justify-center md:justify-start">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>Лекция</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>Практика</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>Семинар</div>
       </div>
    </div>
  );
};

export default ScheduleView;