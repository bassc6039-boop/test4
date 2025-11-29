
import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Library, 
  Settings, 
  LogOut,
  BellRing,
  Trophy,
  Quote,
  CreditCard,
  UserCircle,
  HelpCircle,
  MapPin,
  MessageSquare,
  AlertOctagon,
  ShoppingBag,
  ChevronDown
} from 'lucide-react';
import { ViewType, Theme } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface MenuSection {
    title: string;
    items: { id: ViewType; icon: React.ElementType; label: string; count?: number }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onNavigate }) => {
  
  const menuGroups: MenuSection[] = [
      {
          title: "Основное",
          items: [
              { id: 'dashboard', icon: Home, label: 'Главная' },
              { id: 'announcements', icon: BellRing, label: 'Объявления', count: 5 },
              { id: 'shop', icon: ShoppingBag, label: 'Магазин' },
          ]
      },
      {
          title: "Учеба",
          items: [
              { id: 'schedule', icon: Calendar, label: 'Расписание' },
              { id: 'journal', icon: BookOpen, label: 'Дневник', count: 3 },
              { id: 'performance', icon: GraduationCap, label: 'Оценки' },
              { id: 'courses', icon: GraduationCap, label: 'Курсы' },
              { id: 'library', icon: Library, label: 'Библиотека', count: 1 },
          ]
      },
      {
          title: "Профиль",
          items: [
              { id: 'rewards', icon: Trophy, label: 'Награды' },
              { id: 'reviews', icon: Quote, label: 'Отзывы' },
              { id: 'payment', icon: CreditCard, label: 'Оплата' },
              { id: 'profile', icon: UserCircle, label: 'Кабинет' },
          ]
      },
      {
          title: "Поддержка",
          items: [
              { id: 'faq', icon: HelpCircle, label: 'FAQ' },
              { id: 'contacts', icon: MapPin, label: 'Контакты' },
              { id: 'appeals', icon: MessageSquare, label: 'Обращения' },
              { id: 'complaints', icon: AlertOctagon, label: 'Жалобы' },
          ]
      }
  ];

  // State for collapsible sections (default all open)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Основное": true,
    "Учеба": true,
    "Профиль": true,
    "Поддержка": true
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside className={`fixed left-4 top-4 bottom-4 rounded-[2rem] transition-all duration-300 z-50 flex flex-col shadow-2xl glass ${isOpen ? 'w-72' : 'w-24'}`}>
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center flex-shrink-0 relative overflow-hidden rounded-t-[2rem]">
        <div className="flex items-center gap-3 relative z-10">
            <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl cursor-pointer shadow-lg shadow-primary/40" 
                onClick={() => onNavigate('dashboard')}
            >
                A
            </motion.div>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <span className="font-extrabold text-xl text-text-main tracking-tight leading-none">TOP</span>
                    <span className="text-[10px] font-bold text-text-muted tracking-[0.2em] uppercase">Academy</span>
                </motion.div>
            )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-4 custom-scrollbar space-y-4">
        {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
                {isOpen ? (
                    <div 
                        onClick={() => toggleSection(group.title)}
                        className="flex items-center justify-between cursor-pointer px-4 mb-2 group select-none"
                    >
                        <h4 className="text-[11px] font-bold text-text-muted/60 uppercase tracking-widest group-hover:text-primary transition-colors">
                            {group.title}
                        </h4>
                        <motion.div
                            animate={{ rotate: openSections[group.title] ? 0 : -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-3 h-3 text-text-muted/60 group-hover:text-primary" />
                        </motion.div>
                    </div>
                ) : (
                    // Divider when closed
                    <div className="h-px bg-border mx-4 my-4 opacity-50" />
                )}
                
                <AnimatePresence initial={false}>
                    {(openSections[group.title] || !isOpen) && (
                        <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="space-y-2 overflow-hidden"
                        >
                            {group.items.map((item) => (
                                <li key={item.id}>
                                <motion.button 
                                    whileHover={{ scale: 1.02, x: isOpen ? 4 : 0 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group text-left relative overflow-hidden
                                    ${currentView === item.id
                                        ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                                        : 'text-text-muted hover:bg-bg-paper hover:text-text-main'
                                    }`}
                                >
                                    {currentView === item.id && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary/10 rounded-2xl"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="relative flex-shrink-0">
                                        <item.icon strokeWidth={currentView === item.id ? 2.5 : 2} className={`w-6 h-6 z-10 ${currentView === item.id ? 'text-primary' : 'text-text-muted group-hover:text-text-main'}`} />
                                        {currentView === item.id && (
                                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full"></div>
                                        )}
                                    </div>
                                    
                                    {isOpen && (
                                        <div className="flex-1 flex justify-between items-center z-10 overflow-hidden">
                                            <span className="truncate text-[15px]">{item.label}</span>
                                            {item.count && (
                                            <span className="bg-[#fb7185] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-md shadow-pink-500/20">
                                                {item.count}
                                            </span>
                                            )}
                                        </div>
                                    )}
                                    {!isOpen && item.count && (
                                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#fb7185] rounded-full border-2 border-bg-paper"></span>
                                    )}
                                </motion.button>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="flex-shrink-0 p-4 bg-gradient-to-t from-bg-paper to-transparent backdrop-blur-sm rounded-b-[2rem]">
         <div className="flex flex-col gap-2">
            <button 
                onClick={() => onNavigate('settings')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group text-left
                 ${currentView === 'settings' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-muted hover:bg-bg-paper hover:text-text-main'}
                `}
            >
                <Settings className="w-6 h-6" />
                {isOpen && <span className="text-[15px] font-medium">Настройки</span>}
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors text-[15px] group mt-1">
                <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                {isOpen && <span>Выход</span>}
            </button>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;