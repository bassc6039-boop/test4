import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, History, Download, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentsView: React.FC = () => {
  const history = [
    { id: 1023, date: '25.04.2024', amount: '15 000 ₽', status: 'success', desc: 'Оплата за Май 2024' },
    { id: 1011, date: '25.03.2024', amount: '15 000 ₽', status: 'success', desc: 'Оплата за Апрель 2024' },
    { id: 998, date: '25.02.2024', amount: '15 000 ₽', status: 'success', desc: 'Оплата за Март 2024' },
  ];

  return (
    <div className="space-y-8">
       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Оплата обучения</h1>
        <p className="text-text-muted mt-1">Информация о платежах и договоре</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 glass p-6 rounded-3xl relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                   <div>
                       <h2 className="text-lg font-bold text-text-main mb-1">Договор № 244-12/22</h2>
                       <p className="text-sm text-text-muted">Профессия: Разработка ПО</p>
                   </div>
                   <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                       <CheckCircle className="w-3 h-3" /> Активен
                   </div>
               </div>
               
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
                   <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
                       <CreditCard className="w-48 h-48" />
                   </div>
                   <p className="opacity-80 text-sm mb-1">К оплате до 25.05.2024</p>
                   <h3 className="text-4xl font-bold mb-6">15 000 ₽</h3>
                   <div className="flex gap-3">
                       <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                           Оплатить картой
                       </button>
                       <button className="bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors">
                           Счёт на e-mail
                       </button>
                   </div>
               </div>

               <div className="flex items-center gap-2 text-xs text-text-muted">
                   <AlertCircle className="w-4 h-4" />
                   При оплате до 20 числа скидка 5% бонусами
               </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-3xl flex flex-col justify-center">
               <h3 className="font-bold text-text-main mb-4">Статистика</h3>
               <div className="space-y-4">
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-text-muted">Всего оплачено</span>
                           <span className="font-bold text-text-main">180 000 ₽</span>
                       </div>
                       <div className="h-2 bg-bg-color rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[60%] rounded-full"></div>
                       </div>
                   </div>
                   <div>
                       <div className="flex justify-between text-sm mb-1">
                           <span className="text-text-muted">Остаток</span>
                           <span className="font-bold text-text-main">120 000 ₽</span>
                       </div>
                       <div className="h-2 bg-bg-color rounded-full overflow-hidden">
                           <div className="h-full bg-gray-300 w-full rounded-full"></div>
                       </div>
                   </div>
               </div>
          </motion.div>
      </div>

      {/* History */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-2">
              <History className="w-5 h-5 text-text-muted" />
              <h3 className="font-bold text-text-main">История операций</h3>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-bg-paper/50 text-text-muted font-medium border-b border-border">
                      <tr>
                          <th className="p-4">Дата</th>
                          <th className="p-4">Описание</th>
                          <th className="p-4">Сумма</th>
                          <th className="p-4">Статус</th>
                          <th className="p-4">Чек</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                      {history.map((item) => (
                          <tr key={item.id} className="hover:bg-bg-paper/30 transition-colors">
                              <td className="p-4 text-text-main font-medium">{item.date}</td>
                              <td className="p-4 text-text-muted">{item.desc}</td>
                              <td className="p-4 text-text-main font-bold">{item.amount}</td>
                              <td className="p-4">
                                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-xs font-bold">
                                      Успешно
                                  </span>
                              </td>
                              <td className="p-4">
                                  <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                                      <Download className="w-4 h-4" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </motion.div>
    </div>
  );
};

export default PaymentsView;