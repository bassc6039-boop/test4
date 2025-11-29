import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { DoubleBarChart, RadarChart, SmoothLineChart, DonutChart } from '../DashboardCharts';
import { motion, Variants } from 'framer-motion';

// Mock Data
const barData = [
    { label: 'Янв', value: 30, value2: 45 },
    { label: 'Фев', value: 45, value2: 35 },
    { label: 'Мар', value: 35, value2: 55 },
    { label: 'Апр', value: 60, value2: 40 },
    { label: 'Май', value: 50, value2: 70 },
    { label: 'Июн', value: 75, value2: 60 },
    { label: 'Июл', value: 65, value2: 50 },
    { label: 'Авг', value: 80, value2: 90 },
];

const radarData = [
    { subject: 'Code', A: 90, B: 70, fullMark: 100 },
    { subject: 'Design', A: 60, B: 80, fullMark: 100 },
    { subject: 'Math', A: 85, B: 60, fullMark: 100 },
    { subject: 'Lang', A: 70, B: 65, fullMark: 100 },
    { subject: 'Team', A: 95, B: 75, fullMark: 100 },
];

const lineData = [6, 7.5, 8, 7.2, 9, 9.5, 10.2, 11, 10.8, 11.5, 11.2, 12];
const lineLabels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const DashboardView: React.FC = () => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-3xl font-bold text-text-main">Обзор успеваемости</h1>
        <p className="text-text-muted mt-1">Аналитика за текущий учебный год</p>
      </motion.div>

      {/* Row 1: Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Bar Chart */}
          <motion.div variants={item} className="glass lg:col-span-2 p-6 rounded-3xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-text-main">Активность</h3>
                    <p className="text-xs text-text-muted">Выполненные задания vs Посещения</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                          <span>Задания</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                          <span>Посещения</span>
                      </div>
                  </div>
              </div>
              <div className="h-[250px] w-full relative z-10">
                  <DoubleBarChart data={barData} />
              </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div variants={item} className="glass lg:col-span-1 p-6 rounded-3xl flex flex-col items-center justify-center relative">
               <h3 className="absolute top-6 left-6 text-lg font-bold text-text-main">Навыки</h3>
               <div className="w-full h-[280px] flex items-center justify-center mt-4">
                  <RadarChart data={radarData} />
               </div>
          </motion.div>
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard 
            title="Рейтинг (Coins)" 
            value="3,456" 
            delta="+120" 
            percent="15%" 
            isPositive={true} 
            color="border-pink-500"
            trackColor="bg-pink-400"
          />
          <KPICard 
            title="Просмотры" 
            value="564" 
            delta="+16" 
            percent="47%" 
            isPositive={true} 
            color="border-cyan-400"
            trackColor="bg-cyan-400"
          />
          <KPICard 
            title="Пропуски" 
            value="4" 
            delta="-2" 
            percent="30%" 
            isPositive={true} 
            color="border-amber-500"
            trackColor="bg-amber-500"
          />
          <KPICard 
            title="Комментарии" 
            value="140" 
            delta="-12" 
            percent="25%" 
            isPositive={false} 
            color="border-yellow-400"
            trackColor="bg-yellow-400"
          />
      </div>

      {/* Row 3: Line Chart & Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <motion.div variants={item} className="glass lg:col-span-2 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-text-main">Средний балл</h3>
                  <select className="bg-bg-paper border border-border text-xs rounded-lg px-2 py-1 outline-none text-text-muted">
                      <option>За год</option>
                      <option>За семестр</option>
                  </select>
              </div>
              <div className="h-[250px] w-full">
                  <SmoothLineChart data={lineData} labels={lineLabels} />
              </div>
          </motion.div>

          {/* Donut Chart */}
          <motion.div variants={item} className="glass lg:col-span-1 p-6 rounded-3xl flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold text-text-main mb-6 self-start">Прогресс курса</h3>
              <div className="flex-1 flex items-center justify-center">
                  <DonutChart percent={80} />
              </div>
              <p className="text-center text-sm text-text-muted mt-4">
                  Вы опережаете 85% студентов. Так держать!
              </p>
          </motion.div>
      </div>

    </motion.div>
  );
};

// Helper Component for KPI Cards
const KPICard: React.FC<{title: string, value: string, delta: string, percent: string, isPositive: boolean, color: string, trackColor: string}> = 
({ title, value, delta, percent, isPositive, color, trackColor }) => {
    return (
        <motion.div 
            variants={item}
            whileHover={{ y: -5 }}
            className={`glass p-5 rounded-2xl border-l-4 ${color} flex flex-col justify-between transition-all`}
        >
            <p className="text-xs font-bold text-text-muted uppercase tracking-wide mb-2">{title}</p>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-text-main leading-none">{value}</span>
                <div className={`flex items-center text-xs font-bold mb-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                    {delta}
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="h-1.5 w-full bg-bg-color rounded-full overflow-hidden mr-4">
                     <div className={`h-full rounded-full ${trackColor}`} style={{width: percent}}></div>
                </div>
                <span className="text-xs font-medium text-text-muted">{percent}</span>
            </div>
        </motion.div>
    )
}

export default DashboardView;