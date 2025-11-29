import React from 'react';
import { Star, Download, TrendingUp, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const PerformanceView: React.FC = () => {
  const subjects = [
    { name: 'Системное программирование', avg: 11.5, attendance: 95, trend: 'up' },
    { name: 'Разработка веб-приложений', avg: 10.8, attendance: 100, trend: 'same' },
    { name: 'Базы данных', avg: 9.2, attendance: 80, trend: 'down' },
    { name: 'Английский язык', avg: 11.0, attendance: 90, trend: 'up' },
    { name: 'Паттерны проектирования', avg: 8.5, attendance: 75, trend: 'down' },
    { name: 'Теория вероятностей', avg: 12.0, attendance: 100, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <h1 className="text-3xl font-bold text-text-main">Успеваемость</h1>
               <p className="text-text-muted mt-1">Отслеживание академического прогресса</p>
           </motion.div>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="glass flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-text-main hover:bg-bg-paper transition-all"
           >
               <Download className="w-4 h-4" />
               Выписка оценок
           </motion.button>
       </div>

       {/* Top Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl"
             style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
           >
               <Star className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-20 rotate-12" />
               <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2 opacity-90">
                       <Award className="w-5 h-5" />
                       <h3 className="font-bold text-sm">Рейтинг группы</h3>
                   </div>
                   <div className="text-5xl font-bold mb-2">3 <span className="text-xl opacity-80 font-medium">место</span></div>
                   <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold">
                       <TrendingUp className="w-3 h-3" />
                       Топ 5% курса
                   </div>
               </div>
           </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="glass rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
               <h3 className="text-text-muted font-medium text-sm mb-3 z-10">Средний балл</h3>
               <div className="text-5xl font-bold text-text-main z-10">10.8</div>
               <div className="text-xs text-green-500 mt-3 font-bold bg-green-500/10 px-2 py-1 rounded z-10">
                   +0.4 к прошлому месяцу
               </div>
           </motion.div>

           <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="glass rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors"></div>
               <h3 className="text-text-muted font-medium text-sm mb-3 z-10">Посещаемость</h3>
               <div className="text-5xl font-bold text-text-main z-10">92%</div>
               <div className="w-full bg-border h-1.5 rounded-full mt-4 max-w-[140px] overflow-hidden z-10">
                   <div className="bg-accent h-full rounded-full w-[92%]"></div>
               </div>
           </motion.div>
       </div>

       {/* Detailed Table */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.4 }}
         className="glass rounded-3xl overflow-hidden border border-border"
       >
           <div className="grid grid-cols-12 gap-4 p-5 border-b border-border text-xs font-bold text-text-muted uppercase tracking-wider bg-bg-paper/30">
               <div className="col-span-6 md:col-span-5 flex items-center gap-2">
                   <Target className="w-4 h-4" /> Предмет
               </div>
               <div className="col-span-2 md:col-span-2 text-center">Балл</div>
               <div className="col-span-4 md:col-span-5 text-center">Посещаемость</div>
           </div>
           <div className="divide-y divide-border">
               {subjects.map((sub, idx) => (
                   <motion.div 
                        whileHover={{ backgroundColor: 'var(--bg-paper)' }}
                        key={idx} 
                        className="grid grid-cols-12 gap-4 p-5 items-center transition-colors"
                   >
                       <div className="col-span-6 md:col-span-5 font-bold text-text-main text-sm md:text-base">{sub.name}</div>
                       <div className="col-span-2 md:col-span-2 flex justify-center">
                           <div className={`
                                w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold shadow-inner
                                ${sub.avg >= 10 
                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}
                           `}>
                               {sub.avg}
                           </div>
                       </div>
                       <div className="col-span-4 md:col-span-5 flex items-center gap-4">
                           <div className="flex-1 h-2.5 bg-bg-color rounded-full overflow-hidden shadow-inner">
                               <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${sub.attendance}%` }}
                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                className={`h-full rounded-full ${sub.attendance >= 90 ? 'bg-green-500' : sub.attendance >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                               ></motion.div>
                           </div>
                           <span className="text-xs font-bold text-text-muted w-8 text-right">{sub.attendance}%</span>
                       </div>
                   </motion.div>
               ))}
           </div>
       </motion.div>
    </div>
  );
};

export default PerformanceView;