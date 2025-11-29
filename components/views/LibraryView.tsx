import React from 'react';
import { Search, Book, Bookmark, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const LibraryView: React.FC = () => {
  const books = [
    { title: 'Clean Code', author: 'Robert C. Martin', type: 'Книга', color: 'from-blue-600 to-blue-800' },
    { title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', type: 'Учебник', color: 'from-indigo-600 to-indigo-800' },
    { title: 'Design Patterns', author: 'Gang of Four', type: 'Книга', color: 'from-slate-700 to-slate-900' },
    { title: 'React Documentation', author: 'Meta Team', type: 'Статья', color: 'from-cyan-500 to-cyan-700' },
    { title: 'Database Internals', author: 'Alex Petrov', type: 'Книга', color: 'from-red-600 to-red-800' },
    { title: 'Modern Operating Systems', author: 'Andrew S. Tanenbaum', type: 'Учебник', color: 'from-emerald-600 to-emerald-800' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-3xl font-bold text-text-main">Библиотека</h1>
             <p className="text-text-muted mt-1">Доступ к учебным материалам и книгам</p>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full md:w-96 group"
        >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
                type="text" 
                placeholder="Поиск книг, статей и методичек..." 
                className="w-full pl-10 pr-12 py-3 glass rounded-xl text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-main">
                <Filter className="w-4 h-4" />
            </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                  <div className={`
                    aspect-[2/3] rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 
                    transition-all duration-300 relative mb-4 flex items-center justify-center p-4 text-center overflow-hidden
                    bg-gradient-to-br ${book.color}
                  `}>
                      {/* Decorative elements on book cover */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-black/10 rounded-tr-full"></div>
                      
                      <div className="relative z-10 text-white font-serif">
                          <h3 className="font-bold leading-tight mb-2 text-sm drop-shadow-md">{book.title}</h3>
                          <p className="text-[10px] opacity-80 tracking-wider uppercase">{book.author}</p>
                      </div>
                      
                      <div className="absolute bottom-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-lg shadow-inner">
                          <Book className="w-3.5 h-3.5 text-white" />
                      </div>
                  </div>
                  <div className="px-1">
                      <h4 className="font-bold text-text-main text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{book.title}</h4>
                      <div className="flex items-center justify-between mt-1.5">
                          <p className="text-xs text-text-muted">{book.type}</p>
                          <Bookmark className="w-3.5 h-3.5 text-text-muted hover:text-accent transition-colors" />
                      </div>
                  </div>
              </motion.div>
          ))}
          
          {/* Add placeholders */}
           {[1, 2, 3].map((_, idx) => (
               <motion.div 
                  key={`p-${idx}`} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="group cursor-pointer opacity-40 hover:opacity-80 transition-opacity"
                >
                   <div className="aspect-[2/3] glass rounded-2xl border-2 border-dashed border-border mb-4 flex flex-col items-center justify-center gap-2">
                       <div className="p-3 bg-bg-paper rounded-full">
                          <Sparkles className="w-5 h-5 text-text-muted" />
                       </div>
                       <span className="text-xs font-medium text-text-muted">Скоро</span>
                   </div>
               </motion.div>
           ))}
      </div>
    </div>
  );
};

export default LibraryView;