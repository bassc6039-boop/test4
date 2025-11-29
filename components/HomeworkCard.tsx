import React from 'react';
import { Homework, HomeworkStatus } from '../types';
import { Calendar, Paperclip, ChevronRight, CheckCircle2, AlertCircle, FileText, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeworkCardProps {
  item: Homework;
  onGetHelp: (item: Homework) => void;
}

const statusConfig = {
  [HomeworkStatus.ASSIGNED]: { color: 'bg-blue-500/10 text-blue-600', label: 'Назначено', icon: Clock },
  [HomeworkStatus.IN_PROGRESS]: { color: 'bg-yellow-500/10 text-yellow-600', label: 'В работе', icon: FileText },
  [HomeworkStatus.UPLOADED]: { color: 'bg-purple-500/10 text-purple-600', label: 'Загружено', icon: CheckCircle2 },
  [HomeworkStatus.CHECKED]: { color: 'bg-green-500/10 text-green-600', label: 'Проверено', icon: CheckCircle2 },
  [HomeworkStatus.OVERDUE]: { color: 'bg-red-500/10 text-red-600', label: 'Просрочено', icon: AlertCircle },
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
};

const HomeworkCard: React.FC<HomeworkCardProps> = ({ item, onGetHelp }) => {
  const StatusIcon = statusConfig[item.status].icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      {/* Card Header with Color Accent */}
      <div className="h-1.5 w-full bg-primary"></div>
      
      <div className="p-5 flex flex-col flex-1">
        {/* Top Meta */}
        <div className="flex justify-between items-start mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${statusConfig[item.status].color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {statusConfig[item.status].label}
            </span>
            {item.grade && (
                <div className="flex items-center justify-center bg-green-500/10 text-green-600 font-bold px-3 py-1 rounded-md border border-green-500/20 text-sm">
                    {item.grade} <span className="text-text-muted text-xs font-normal ml-1">/ {item.maxGrade}</span>
                </div>
            )}
        </div>

        {/* Content */}
        <div className="flex-1">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.subject}</h3>
            <h2 className="text-lg font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                {item.topic}
            </h2>
            <p className="text-sm text-text-muted line-clamp-3 mb-4">
                {item.description}
            </p>
        </div>

        {/* Files & Teacher */}
        <div className="border-t border-border pt-4 mt-2">
            <div className="flex items-center justify-between mb-4 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                     <img src={item.teacher.avatar} alt={item.teacher.name} className="w-6 h-6 rounded-full" />
                     <span>{item.teacher.name}</span>
                </div>
                {item.files && item.files.length > 0 && (
                     <div className="flex items-center gap-1 text-text-muted/70">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{item.files.length}</span>
                     </div>
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex flex-col gap-1">
                    <span className="text-text-muted/70">Срок сдачи:</span>
                    <span className={`flex items-center gap-1.5 ${item.status === HomeworkStatus.OVERDUE ? 'text-red-500' : 'text-text-main'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(item.dateDeadline)}
                    </span>
                </div>
                <div className="flex gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onGetHelp(item)}
                    className="p-2 text-accent bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors group/ai"
                    title="Спросить AI помощника"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                      <span>Подробнее</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeworkCard;