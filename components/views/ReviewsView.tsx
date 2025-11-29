import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ThumbsUp } from 'lucide-react';

const ReviewsView: React.FC = () => {
  const reviews = [
    { id: 1, teacher: 'Петров В.С.', subject: 'Системное программирование', text: 'Александр проявляет отличные способности к низкоуровневой оптимизации. Код всегда чистый и структурированный.', date: '20.05.2024', avatar: 'https://picsum.photos/id/101/50/50' },
    { id: 2, teacher: 'Смирнова Е.А.', subject: 'Веб-разработка', text: 'Хорошее понимание React, но стоит больше внимания уделять accessibility (доступности) интерфейсов. В целом, молодец.', date: '15.04.2024', avatar: 'https://picsum.photos/id/102/50/50' },
    { id: 3, teacher: 'Козлов Д.М.', subject: 'Базы данных', text: 'Отличная работа с SQL-запросами. Лабораторные сдает вовремя.', date: '10.03.2024', avatar: 'https://picsum.photos/id/103/50/50' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Отзывы о студенте</h1>
        <p className="text-text-muted mt-1">Обратная связь от преподавателей</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-3xl relative"
              >
                  <Quote className="absolute top-6 right-6 text-primary/10 w-12 h-12" />
                  
                  <div className="flex items-center gap-4 mb-4">
                      <img src={review.avatar} alt={review.teacher} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                      <div>
                          <h3 className="font-bold text-text-main">{review.teacher}</h3>
                          <p className="text-xs text-text-muted">{review.subject}</p>
                      </div>
                  </div>
                  
                  <p className="text-text-main italic text-sm leading-relaxed mb-4">
                      "{review.text}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs text-text-muted">{review.date}</span>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-primary transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Спасибо
                      </button>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ReviewsView;