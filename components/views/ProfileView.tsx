import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Github, Camera, Edit2, Shield, Key } from 'lucide-react';
import { CURRENT_USER } from '../../constants';

const ProfileView: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Личный кабинет</h1>
        <p className="text-text-muted mt-1">Управление профилем и настройки безопасности</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Basic Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass rounded-3xl p-8 flex flex-col items-center text-center h-fit"
          >
              <div className="relative mb-6 group cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-bg-paper shadow-xl">
                      <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-text-main">{CURRENT_USER.name}</h2>
              <p className="text-text-muted mb-6">Студент группы {CURRENT_USER.group}</p>
              
              <div className="flex gap-3 w-full">
                  <button className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                      Редактировать
                  </button>
                  <button className="p-2 glass rounded-xl text-text-muted hover:text-text-main transition-colors">
                      <Edit2 className="w-5 h-5" />
                  </button>
              </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-2 space-y-6"
          >
              {/* Personal Data */}
              <div className="glass rounded-3xl p-8">
                  <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Личные данные
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase">Email</label>
                          <div className="flex items-center gap-3 p-3 bg-bg-paper rounded-xl border border-border">
                              <Mail className="w-4 h-4 text-text-muted" />
                              <span className="text-sm text-text-main">{CURRENT_USER.email}</span>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase">Телефон</label>
                          <div className="flex items-center gap-3 p-3 bg-bg-paper rounded-xl border border-border">
                              <Phone className="w-4 h-4 text-text-muted" />
                              <span className="text-sm text-text-main">{CURRENT_USER.phone}</span>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase">GitHub</label>
                          <div className="flex items-center gap-3 p-3 bg-bg-paper rounded-xl border border-border">
                              <Github className="w-4 h-4 text-text-muted" />
                              <span className="text-sm text-text-main">{CURRENT_USER.github}</span>
                          </div>
                      </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase">Дата рождения</label>
                          <div className="flex items-center gap-3 p-3 bg-bg-paper rounded-xl border border-border">
                              <User className="w-4 h-4 text-text-muted" />
                              <span className="text-sm text-text-main">{CURRENT_USER.dob}</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Security */}
              <div className="glass rounded-3xl p-8">
                  <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Безопасность
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                              <Key className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                              <h4 className="font-bold text-text-main">Пароль</h4>
                              <p className="text-xs text-text-muted">Последнее изменение: 3 месяца назад</p>
                          </div>
                      </div>
                      <button className="text-sm font-bold text-text-muted border border-border px-4 py-2 rounded-xl hover:bg-bg-paper hover:text-text-main transition-colors">
                          Сменить пароль
                      </button>
                  </div>
              </div>
          </motion.div>
      </div>
    </div>
  );
};

export default ProfileView;