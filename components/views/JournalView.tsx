import React, { useState, useMemo } from 'react';
import { Homework, HomeworkStatus } from '../../types';
import { MOCK_HOMEWORK } from '../../constants';
import GeminiModal from '../GeminiModal';
import { getHomeworkHelp } from '../../services/geminiService';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Clock, 
  MoreHorizontal, 
  MessageSquare, 
  Info,
  FileCheck
} from 'lucide-react';

// --- Custom Journal Card Component ---
const JournalCard: React.FC<{ item: Homework; onOpen: (item: Homework) => void }> = ({ item, onOpen }) => {
  // Configuration based on status
  const config = useMemo(() => {
    switch (item.status) {
      case HomeworkStatus.OVERDUE:
        return {
          footerBg: 'bg-[#dc2626]', // Red
          footerText: 'text-white',
          centerColor: 'bg-[#dc2626]',
          icon: AlertCircle,
          label: 'Просрочено'
        };
      case HomeworkStatus.CHECKED:
        return {
          footerBg: 'bg-[#0d9488]', // Teal
          footerText: 'text-white',
          centerColor: 'bg-[#0d9488]',
          icon: CheckCircle2,
          label: 'Проверено'
        };
      case HomeworkStatus.UPLOADED:
        return {
          footerBg: 'bg-[#eab308]', // Yellow
          footerText: 'text-white',
          centerColor: 'bg-[#eab308]',
          icon: FileCheck,
          label: 'На проверке'
        };
      default: // Assigned / In Progress
        return {
          footerBg: 'bg-[#3b82f6]', // Blue
          footerText: 'text-white',
          centerColor: 'bg-[#3b82f6]',
          icon: Clock,
          label: 'В работе'
        };
    }
  }, [item.status]);

  const formatDate = (isoDate: string) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onOpen(item)}
      className="flex-shrink-0 w-[220px] h-[340px] glass rounded-xl overflow-hidden flex flex-col cursor-pointer group shadow-lg"
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-start bg-bg-paper/30 h-[70px]">
        <h3 className="text-xs font-bold text-text-muted line-clamp-2 uppercase tracking-wide leading-relaxed">
          {item.subject}
        </h3>
        <div className="flex gap-2 text-text-muted/50">
           <MessageSquare className="w-4 h-4 hover:text-primary transition-colors" />
           <Info className="w-4 h-4 hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Body / Visual Center */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 z-0">
            {item.status === HomeworkStatus.CHECKED ? (
                <div className="w-full h-full bg-gradient-to-b from-transparent to-[#0d9488]/20 relative">
                     {/* Simulating the "brain" or abstract art from the reference */}
                     <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://picsum.photos/300/400?blur=5')] bg-cover bg-center"></div>
                </div>
            ) : item.status === HomeworkStatus.OVERDUE ? (
                 <div className="w-full h-full bg-gradient-to-b from-transparent to-red-500/10"></div>
            ) : (
                 <div className="w-full h-full bg-gradient-to-b from-transparent to-bg-paper/50"></div>
            )}
        </div>

        {/* Central Element */}
        <div className="relative z-10">
            {item.grade ? (
                <div className={`w-20 h-20 rounded-full ${config.centerColor} shadow-xl flex items-center justify-center text-white font-bold text-4xl border-4 border-white/20`}>
                    {item.grade}
                </div>
            ) : (
                <div className={`w-16 h-16 rounded-full ${config.centerColor} shadow-lg flex items-center justify-center text-white border-4 border-white/20`}>
                     <config.icon className="w-8 h-8" />
                </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <div className={`${config.footerBg} ${config.footerText} p-3 text-[10px] font-medium flex justify-between items-center`}>
          <div className="flex flex-col">
              <span className="opacity-80 mb-0.5">Срок</span>
              <span className="font-bold text-xs">{formatDate(item.dateDeadline)}</span>
          </div>
          <div className="flex flex-col text-right">
              {item.status !== HomeworkStatus.ASSIGNED && item.status !== HomeworkStatus.IN_PROGRESS ? (
                  <>
                    <span className="opacity-80 mb-0.5">Сдано</span>
                    <span className="font-bold text-xs">{formatDate(item.dateAssigned)}</span> {/* Using assigned as mock submit date */}
                  </>
              ) : (
                  <span className="opacity-80 self-end">Не сдано</span>
              )}
          </div>
      </div>
    </motion.div>
  );
};

// --- Main View ---
const JournalView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Grouping Data
  const groupedHomework = useMemo(() => {
    return {
        overdue: MOCK_HOMEWORK.filter(h => h.status === HomeworkStatus.OVERDUE),
        checked: MOCK_HOMEWORK.filter(h => h.status === HomeworkStatus.CHECKED),
        review: MOCK_HOMEWORK.filter(h => h.status === HomeworkStatus.UPLOADED),
        active: MOCK_HOMEWORK.filter(h => h.status === HomeworkStatus.ASSIGNED || h.status === HomeworkStatus.IN_PROGRESS),
    };
  }, []);

  const handleGetHelp = async (item: Homework) => {
    setModalTitle(`${item.subject}: ${item.topic}`);
    setModalOpen(true);
    setModalLoading(true);
    const helpText = await getHomeworkHelp(item.subject, item.topic, item.description);
    setModalContent(helpText);
    setModalLoading(false);
  };

  const Section: React.FC<{ title: string; items: Homework[]; colorClass: string }> = ({ title, items, colorClass }) => {
      if (items.length === 0) return null;
      
      return (
          <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-base font-medium ${colorClass}`}>
                      {title}: <span className="font-bold">{items.length}</span>
                  </h2>
                  <button className="text-xs text-text-muted hover:text-primary transition-colors">Показать еще</button>
              </div>
              
              {/* Horizontal Scroll Container */}
              <div className="flex gap-5 overflow-x-auto pb-6 -mx-2 px-2 snap-x hide-scrollbar">
                  {items.map((item) => (
                      <JournalCard key={item.id} item={item} onOpen={handleGetHelp} />
                  ))}
                  {/* Spacer for right padding */}
                  <div className="w-2 flex-shrink-0"></div>
              </div>
          </div>
      )
  }

  return (
    <div className="space-y-2 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between mb-8"
      >
          <div>
            <h1 className="text-3xl font-bold text-text-main">Дневник</h1>
            <p className="text-text-muted text-sm mt-1">Все задания в одном месте</p>
          </div>
          
          <div className="flex gap-2">
              <button className="p-2 glass rounded-lg text-text-muted hover:text-primary transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
              </button>
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
          <Section 
            title="Просрочено" 
            items={groupedHomework.overdue} 
            colorClass="text-red-500"
          />

          <Section 
            title="Проверено" 
            items={groupedHomework.checked} 
            colorClass="text-teal-500" // Closer match to image teal
          />
          
          <Section 
            title="На проверке" 
            items={groupedHomework.review} 
            colorClass="text-yellow-500"
          />

          <Section 
            title="В работе" 
            items={groupedHomework.active} 
            colorClass="text-blue-500"
          />
      </motion.div>

      {/* Empty State if absolutely nothing */}
      {MOCK_HOMEWORK.length === 0 && (
         <div className="flex flex-col items-center justify-center h-64 text-text-muted">
            <FileText className="w-12 h-12 mb-4 opacity-20" />
            <p>Нет активных заданий</p>
         </div>
      )}

      <GeminiModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isLoading={modalLoading}
        content={modalContent}
        homeworkTitle={modalTitle}
      />
    </div>
  );
};

export default JournalView;