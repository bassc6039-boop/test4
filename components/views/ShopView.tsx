
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Coins, Diamond, Tag, Sparkles } from 'lucide-react';
import { CURRENT_USER } from '../../constants';

// Product Interface
interface Product {
  id: number;
  title: string;
  priceCoins: number;
  priceCrystals: number;
  available: number;
  imageUrl: string;
  category: string;
}

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Набор тетрадей IT TOP (2 шт)',
    priceCoins: 84,
    priceCrystals: 84,
    available: 12,
    imageUrl: 'https://placehold.co/400x400/18181b/FFF?text=Notebooks',
    category: 'Канцелярия'
  },
  {
    id: 2,
    title: 'Коврик для мыши XL',
    priceCoins: 350,
    priceCrystals: 350,
    available: 5,
    imageUrl: 'https://placehold.co/400x400/3b82f6/FFF?text=Mousepad',
    category: 'Аксессуары'
  },
  {
    id: 3,
    title: 'Фирменные носки',
    priceCoins: 896,
    priceCrystals: 896,
    available: 24,
    imageUrl: 'https://placehold.co/400x400/f4f4f5/18181b?text=Socks',
    category: 'Одежда'
  },
  {
    id: 4,
    title: 'Обложка на студенческий',
    priceCoins: 490,
    priceCrystals: 490,
    available: 15,
    imageUrl: 'https://placehold.co/400x400/8b5cf6/FFF?text=ID+Cover',
    category: 'Аксессуары'
  },
  {
    id: 5,
    title: 'Обложка на паспорт',
    priceCoins: 490,
    priceCrystals: 490,
    available: 3,
    imageUrl: 'https://placehold.co/400x400/ec4899/FFF?text=Passport',
    category: 'Аксессуары'
  },
  {
    id: 6,
    title: 'Картхолдер',
    priceCoins: 450,
    priceCrystals: 450,
    available: 8,
    imageUrl: 'https://placehold.co/400x400/10b981/FFF?text=Cardholder',
    category: 'Аксессуары'
  },
  {
    id: 7,
    title: 'Тетрадь на пружине',
    priceCoins: 150,
    priceCrystals: 150,
    available: 40,
    imageUrl: 'https://placehold.co/400x400/f59e0b/FFF?text=Spiral',
    category: 'Канцелярия'
  },
  {
    id: 8,
    title: 'Набор 3D стикеров',
    priceCoins: 250,
    priceCrystals: 250,
    available: 100,
    imageUrl: 'https://placehold.co/400x400/06b6d4/FFF?text=Stickers',
    category: 'Мерч'
  },
];

const ShopView: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text-main">Магазин мерча</h1>
        <p className="text-text-muted mt-1">Обменивай заработанные коины на реальные товары</p>
      </motion.div>

      {/* Balance Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-[2rem] p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
          {/* Decorative Background */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
               {/* Balance Cards */}
               <div className="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
                   <div className="bg-bg-paper/50 rounded-2xl p-4 border border-border flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                           <Coins className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                       </div>
                       <div>
                           <p className="text-xs font-bold text-text-muted uppercase">Ваши Коины</p>
                           <p className="text-2xl font-bold text-text-main">{CURRENT_USER.coins}</p>
                       </div>
                   </div>
                   <div className="bg-bg-paper/50 rounded-2xl p-4 border border-border flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                           <Diamond className="w-6 h-6 text-green-500 fill-green-500" />
                       </div>
                       <div>
                           <p className="text-xs font-bold text-text-muted uppercase">Кристаллы</p>
                           <p className="text-2xl font-bold text-text-main">{CURRENT_USER.crystals}</p>
                       </div>
                   </div>
               </div>

               <div className="h-16 w-px bg-border hidden md:block"></div>

               {/* Cart & History */}
               <div className="flex gap-3">
                   <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 text-text-main hover:bg-bg-paper transition-all font-medium group">
                       <ShoppingCart className="w-5 h-5 text-text-muted group-hover:text-primary" />
                       Корзина
                       <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
                   </button>
                   <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 text-text-main hover:bg-bg-paper transition-all font-medium">
                       История покупок
                   </button>
               </div>
          </div>
      </motion.div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl overflow-hidden flex flex-col group relative"
              >
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                      <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-text-muted backdrop-blur-md flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {product.category}
                      </span>
                  </div>

                  {/* Image Area */}
                  <div className="aspect-square relative p-6 flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-paper to-transparent">
                       <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
                       <motion.img 
                          whileHover={{ scale: 1.1, rotate: 3 }}
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-full object-contain rounded-xl shadow-sm"
                        />
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1 bg-bg-paper/30">
                      <h3 className="text-text-main font-bold text-sm mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {product.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-border/50">
                          <div className="flex justify-between items-end mb-4">
                              <div className="flex flex-col">
                                  <span className="text-[10px] text-text-muted uppercase font-bold">Цена</span>
                                  <div className="flex items-center gap-1.5 text-text-main font-bold text-lg">
                                      {product.priceCoins}
                                      <Coins className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  </div>
                              </div>
                              <div className="text-right">
                                  <span className="text-[10px] text-text-muted uppercase font-bold">Остаток</span>
                                  <div className="text-sm font-medium text-text-main">
                                      {product.available} шт.
                                  </div>
                              </div>
                          </div>
                          
                          <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2">
                              <Sparkles className="w-4 h-4 fill-white/20" />
                              Купить сейчас
                          </button>
                      </div>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ShopView;
