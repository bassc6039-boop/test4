
import React from 'react';
import { Bell, Menu, Coins, Diamond } from 'lucide-react';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: UserProfile;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, toggleSidebar }) => {
  return (
    <header className="glass h-20 rounded-[2rem] flex items-center justify-between px-8 sticky top-4 z-40 mx-0 mb-6 shadow-lg">
      <div className="flex items-center gap-4">
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-3 hover:bg-bg-paper rounded-full text-text-muted transition-colors md:hidden"
        >
            <Menu className="w-6 h-6" />
        </motion.button>
        <div className="hidden md:flex items-center text-sm text-text-muted">
            <span className="hover:text-primary cursor-pointer transition-colors font-medium">Главная</span>
            <span className="mx-3 opacity-50">/</span>
            <span className="text-text-main font-bold">Обзор</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Gamification Stats */}
        <div className="hidden lg:flex items-center gap-5 bg-bg-paper/80 px-5 py-2 rounded-full border border-border backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm">
                <Coins className="w-5 h-5 fill-yellow-500" />
                <span>{user.coins}</span>
            </div>
            <div className="w-px h-5 bg-border"></div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Diamond className="w-5 h-5 fill-blue-400" />
                <span>{user.crystals}</span>
            </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-4">
            <motion.div 
                whileHover={{ rotate: 15 }}
                className="relative cursor-pointer p-2 hover:bg-bg-paper rounded-full transition-colors"
            >
                <Bell className="w-6 h-6 text-text-muted hover:text-text-main transition-colors" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-800"></span>
            </motion.div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-border">
            <div className="hidden md:block text-right">
                <div className="text-sm font-bold text-text-main leading-tight">{user.name}</div>
                <div className="text-xs text-text-muted font-medium mt-0.5">{user.group}</div>
            </div>
            <motion.img 
                whileHover={{ scale: 1.05 }}
                src={user.avatar} 
                alt="Profile" 
                className="w-11 h-11 rounded-full object-cover border-2 border-border cursor-pointer shadow-sm"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;
