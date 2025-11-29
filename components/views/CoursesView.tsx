import React from 'react';
import { PlayCircle, MoreHorizontal, Clock, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const CoursesView: React.FC = () => {
  const courses = [
    { title: 'Разработка на C++', progress: 75, modules: '12/16', last: 'Вчера', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Базы данных (PostgreSQL)', progress: 45, modules: '5/12', last: '3 дня назад', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Веб-дизайн (UI/UX)', progress: 90, modules: '18/20', last: 'Сегодня', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Soft Skills: Коммуникация', progress: 15, modules: '2/10', last: 'Неделю назад', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-text-main">Мои курсы</h1>
            <p className="text-text-muted mt-1">Продолжайте обучение и развивайте навыки</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                    className="glass p-6 rounded-3xl group cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-text-muted hover:text-text-main">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-start gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl ${course.bg} flex items-center justify-center ${course.color} shadow-inner`}>
                             <PlayCircle className="w-8 h-8" />
                        </div>
                        <div className="pt-1">
                            <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-text-muted font-medium">
                                <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> Сертификат</span>
                                <span className="w-1 h-1 rounded-full bg-text-muted opacity-50"></span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 120 студентов</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-bg-paper/50 rounded-xl p-4 mb-6 border border-border">
                        <div className="flex justify-between items-center text-xs text-text-muted mb-3">
                             <div className="flex items-center gap-1.5">
                                 <Clock className="w-3.5 h-3.5" />
                                 <span>Активность: {course.last}</span>
                             </div>
                             <span>{course.modules}</span>
                        </div>
                        
                        <div className="relative pt-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/50 text-text-main border border-border">
                                    {course.progress}%
                                </span>
                            </div>
                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-bg-color shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${course.color.replace('text', 'bg')}`}
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl border border-border text-sm font-bold text-text-main hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                        Продолжить обучение
                    </button>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default CoursesView;