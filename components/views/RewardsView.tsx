import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coins, Diamond, Lock, Award, Star } from 'lucide-react';
import { CURRENT_USER } from '../../constants';

const RewardsView: React.FC = () => {
  const badges = [
    { name: 'Первопроходец', desc: 'Зарегистрировался на платформе', icon: Star, color: 'text-yellow-400', locked: false },
    { name: 'Король Кода', desc: 'Сдал 10 лабораторных на "Отлично"', icon: Trophy, color: 'text-purple-500', locked: false },
    { name: 'Полиглот', desc: 'Изучил 3 языка программирования', icon: Award, color: 'text-blue-500', locked: true },
    { name: 'Ночной Житель', desc: 'Загрузил ДЗ после 00:00', icon: MoonIcon, color: 'text-indigo-400', locked: false },
    { name: 'Душа Компании', desc: 'Получил 50 лайков на форуме', icon: HeartIcon, color: 'text-pink-500', locked: true },
    { name: 'Киберспортсмен', desc: 'Победил в локальном хакатоне', icon: GamepadIcon, color: 'text-green-500', locked: true },
  ];

  function MoonIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> }
  function HeartIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> }
  function GamepadIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg> }

  return (
    <div className="space-y-8">
       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Награды и Достижения</h1>
        <p className="text-text-muted mt-1">Твоя стена славы в академии</p>
      </motion.div>

      {/* Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="glass p-8 rounded-3xl relative overflow-hidden flex items-center justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Coins className="w-32 h-32" />
              </div>
              <div>
                  <h2 className="text-text-muted font-bold uppercase tracking-wider text-sm mb-2">Баланс монет</h2>
                  <div className="text-5xl font-bold text-yellow-500 flex items-center gap-3">
                      <Coins className="w-10 h-10 fill-yellow-500 text-yellow-600" />
                      {CURRENT_USER.coins}
                  </div>
                  <button className="mt-4 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Потратить в магазине
                  </button>
              </div>
          </motion.div>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="glass p-8 rounded-3xl relative overflow-hidden flex items-center justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Diamond className="w-32 h-32" />
              </div>
              <div>
                  <h2 className="text-text-muted font-bold uppercase tracking-wider text-sm mb-2">Кристаллы</h2>
                  <div className="text-5xl font-bold text-blue-400 flex items-center gap-3">
                      <Diamond className="w-10 h-10 fill-blue-400 text-blue-500" />
                      {CURRENT_USER.crystals}
                  </div>
                  <button className="mt-4 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Обменять на услуги
                  </button>
              </div>
          </motion.div>
      </div>

      {/* Badges Grid */}
      <div>
          <h2 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-text-muted" />
              Мои бейджи
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.map((badge, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className={`glass p-4 rounded-2xl flex flex-col items-center text-center relative overflow-hidden ${badge.locked ? 'opacity-60 grayscale' : ''}`}
                  >
                      <div className={`w-16 h-16 rounded-full bg-bg-paper flex items-center justify-center mb-3 shadow-inner ${badge.color}`}>
                          <badge.icon className={`w-8 h-8 ${badge.locked ? 'text-gray-400' : ''}`} />
                      </div>
                      <h3 className="font-bold text-text-main text-sm">{badge.name}</h3>
                      <p className="text-xs text-text-muted mt-1">{badge.desc}</p>
                      
                      {badge.locked && (
                          <div className="absolute top-2 right-2 text-text-muted">
                              <Lock className="w-4 h-4" />
                          </div>
                      )}
                  </motion.div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default RewardsView;