import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Send, MessageSquare, AlertTriangle, FileWarning } from 'lucide-react';

// --- FAQ Component ---
export const FAQView: React.FC = () => {
  const faqs = [
    { q: "Как загрузить домашнее задание?", a: "Перейдите на вкладку 'Дневник', выберите задание и нажмите кнопку загрузки файла. Поддерживаются форматы PDF, ZIP, DOCX." },
    { q: "Как оплатить обучение бонусами?", a: "Бонусы можно списать на странице оплаты. 1 бонус = 1 рубль. Максимальная сумма списания - 30% от стоимости." },
    { q: "Где посмотреть записи лекций?", a: "Записи доступны в разделе 'Учебные материалы' -> 'Видео' в течение 24 часов после окончания занятия." },
    { q: "Как связаться с преподавателем?", a: "Вы можете написать личное сообщение преподавателю через его профиль или задать вопрос в комментарии к домашнему заданию." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Часто задаваемые вопросы</h1>
        <p className="text-text-muted mt-1">Ответы на популярные вопросы студентов</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-text-main hover:bg-bg-paper/50 transition-colors"
            >
              {item.q}
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-text-muted text-sm leading-relaxed border-t border-border/50">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Contacts Component ---
export const ContactsView: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Контакты</h1>
        <p className="text-text-muted mt-1">Связь с администрацией и учебной частью</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-3xl flex flex-col items-center text-center hover:bg-bg-paper transition-colors">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
             <Phone className="w-6 h-6" />
           </div>
           <h3 className="font-bold text-text-main mb-1">Телефон</h3>
           <p className="text-text-muted text-sm">+7 (495) 123-45-67</p>
           <p className="text-text-muted text-xs mt-1">Пн-Пт: 09:00 - 19:00</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.1}} className="glass p-6 rounded-3xl flex flex-col items-center text-center hover:bg-bg-paper transition-colors">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
             <Mail className="w-6 h-6" />
           </div>
           <h3 className="font-bold text-text-main mb-1">Email</h3>
           <p className="text-text-muted text-sm">support@top-academy.ru</p>
           <p className="text-text-muted text-xs mt-1">Ответ в течение 24 часов</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2}} className="glass p-6 rounded-3xl flex flex-col items-center text-center hover:bg-bg-paper transition-colors">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
             <MapPin className="w-6 h-6" />
           </div>
           <h3 className="font-bold text-text-main mb-1">Адрес</h3>
           <p className="text-text-muted text-sm">г. Москва, Кутузовский пр-т, д. 36</p>
           <p className="text-text-muted text-xs mt-1">Главный корпус, 3 этаж</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="glass rounded-3xl overflow-hidden h-96 relative border border-border/50 shadow-inner"
      >
          <iframe 
            src="https://yandex.ru/map-widget/v1/?text=%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9A%D1%83%D1%82%D1%83%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82%2C%20%D0%B4.%2036&z=16" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            allowFullScreen={true}
            style={{ position: 'relative', border: 'none' }}
            title="Yandex Map"
          ></iframe>
      </motion.div>
    </div>
  );
};

// --- Support / Appeals Component ---
export const SupportView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Обращения</h1>
        <p className="text-text-muted mt-1">Задать вопрос учебной части или техподдержке</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl">
         <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase">Тема</label>
                  <select className="w-full glass p-3 rounded-xl outline-none focus:ring-2 ring-primary/50 text-text-main">
                      <option>Техническая проблема</option>
                      <option>Вопрос по оплате</option>
                      <option>Вопрос по расписанию</option>
                      <option>Другое</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase">Приоритет</label>
                  <select className="w-full glass p-3 rounded-xl outline-none focus:ring-2 ring-primary/50 text-text-main">
                      <option>Обычный</option>
                      <option>Высокий</option>
                  </select>
               </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase">Сообщение</label>
                <textarea 
                  rows={5}
                  placeholder="Опишите вашу проблему подробно..." 
                  className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-primary/50 text-text-main placeholder-text-muted/50 resize-none"
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button type="button" className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
                    <Send className="w-4 h-4" />
                    Отправить обращение
                </button>
            </div>
         </form>
      </motion.div>

      <div className="mt-8">
          <h3 className="text-lg font-bold text-text-main mb-4">История обращений</h3>
          <div className="glass rounded-2xl p-6 text-center text-text-muted">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>У вас пока нет активных обращений</p>
          </div>
      </div>
    </div>
  );
};

// --- Complaints Component ---
export const ComplaintsView: React.FC = () => {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Жалобы
          </h1>
          <p className="text-text-muted mt-1">Анонимная форма подачи жалоб на качество обучения</p>
        </motion.div>
  
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl border border-red-500/10">
           <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 flex gap-3 text-sm">
               <FileWarning className="w-5 h-5 flex-shrink-0" />
               <p>Все жалобы рассматриваются отделом контроля качества. Вы можете отправить жалобу анонимно.</p>
           </div>

           <form className="space-y-6">
              <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase">На кого жалоба?</label>
                  <input 
                    type="text" 
                    placeholder="ФИО преподавателя или сотрудника"
                    className="w-full glass p-3 rounded-xl outline-none focus:ring-2 ring-red-500/50 text-text-main"
                  />
              </div>
              
              <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase">Суть претензии</label>
                  <textarea 
                    rows={5}
                    placeholder="Опишите ситуацию..." 
                    className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-red-500/50 text-text-main placeholder-text-muted/50 resize-none"
                  ></textarea>
              </div>
  
              <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded text-red-500 focus:ring-red-500" />
                      <span className="text-sm text-text-main">Отправить анонимно</span>
                  </label>

                  <button type="button" className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-500/30">
                      <AlertTriangle className="w-4 h-4" />
                      Подать жалобу
                  </button>
              </div>
           </form>
        </motion.div>
      </div>
    );
  };