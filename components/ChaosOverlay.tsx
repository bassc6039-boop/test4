
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets / Content ---
const CURSED_ADS = [
  { text: "FREE PUNJABI MOVIE 2024 🦠", sub: "NO VIRUS DOWNLOAD NOW", color: "bg-green-500" },
  { text: "WHATSAPP 2 GOLD EDITION", sub: "INSTALL FREE NOW !!!", color: "bg-yellow-400" },
  { text: "IPHONE 15 PRO MAX FREE 📱", sub: "YOU ARE 999,999th VISITOR", color: "bg-red-500" },
  { text: "HOT SINGLE MOMS NEARBY", sub: "40 METERS FROM YOU", color: "bg-pink-500" },
  { text: "RAM DOWNLOADER.EXE", sub: "SPEED UP PC 5000%", color: "bg-blue-600" },
  { text: "تحميل مجاني للفيروسات 😂", sub: "CAMEL SEX FREE 🐪", color: "bg-orange-500" },
  { text: "FREE MINECRAFT", sub: "NO REGISTRATION", color: "bg-lime-500" }
];

const ALERTS = [
  { title: "⚠️ WARNING ⚠️", msg: "VIRUS DETECTED!!! DELETING SYSTEM32..." },
  { title: "📞 WHATSAPP", msg: "Incoming call from: UNKNOWN" },
  { title: "📍 LOCATION", msg: "You are 40 meters from: THE VOID" },
  { title: "😳 BRUH", msg: "CRINGE DETECTED ON SYSTEM" },
  { title: "👁️ THEY SEE YOU", msg: "DONT LOOK BEHIND YOU" },
];

// --- Sub-Components for Entities ---

const VoidEntity: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
        opacity: [0, 0.9, 0], 
        scale: [0.8, 1.2, 0.9],
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0]
    }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2, times: [0, 0.2, 1] }}
    className="absolute pointer-events-none z-[100] w-64 h-96 filter blur-sm"
    style={{ left: x, top: y }}
  >
    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {/* Shadow Body */}
      <path d="M100 20C50 20 20 80 20 150C20 250 50 300 100 300C150 300 180 250 180 150C180 80 150 20 100 20Z" fill="black" opacity="0.9"/>
      <path d="M100 0C30 0 0 80 0 150V300H200V150C200 80 170 0 100 0Z" fill="black" opacity="0.4" filter="blur(10px)"/>
      
      {/* Glowing Eyes */}
      <circle cx="70" cy="100" r="8" fill="red" className="animate-pulse" />
      <circle cx="130" cy="100" r="8" fill="red" className="animate-pulse" />
      
      {/* Creepy Mouth */}
      <path d="M60 180 Q100 240 140 180" stroke="black" strokeWidth="5" fill="none"/>
      <path d="M60 180 Q100 220 140 180" stroke="#330000" strokeWidth="2" fill="none"/>
    </svg>
  </motion.div>
);

const ShadowMan: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute w-32 h-64 pointer-events-none z-[90] mix-blend-multiply"
        style={{ left: x, top: y }}
    >
        <div className="w-full h-full bg-black blur-md rounded-[50%]" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
        <div className="absolute top-10 left-8 w-4 h-4 bg-white rounded-full blur-[1px]"></div>
        <div className="absolute top-10 right-8 w-4 h-4 bg-white rounded-full blur-[1px]"></div>
    </motion.div>
)

const JumpscareFace = () => (
    <motion.div
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: [0, 1, 0], scale: [1.5, 1, 1.5] }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] bg-black flex items-center justify-center pointer-events-none"
    >
        <svg viewBox="0 0 500 500" className="w-full h-full max-w-2xl">
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
                </radialGradient>
            </defs>
            <circle cx="250" cy="250" r="200" fill="url(#grad1)" />
            <ellipse cx="180" cy="200" rx="30" ry="50" fill="black" />
            <ellipse cx="320" cy="200" rx="30" ry="50" fill="black" />
            <circle cx="180" cy="200" r="5" fill="red" />
            <circle cx="320" cy="200" r="5" fill="red" />
            <path d="M 150 350 Q 250 500 350 350" stroke="black" strokeWidth="20" fill="black" />
            <path d="M 150 350 Q 250 500 350 350" stroke="red" strokeWidth="2" fill="none" />
        </svg>
        <h1 className="absolute text-red-600 text-9xl font-black animate-pulse mix-blend-difference">WAKE UP</h1>
    </motion.div>
)


const ChaosOverlay: React.FC = () => {
  const [activeAds, setActiveAds] = useState<{id: number, x: number, y: number, content: any}[]>([]);
  const [voidEntities, setVoidEntities] = useState<{id: number, x: number, y: number, type: 'void' | 'shadow'}[]>([]);
  const [alert, setAlert] = useState<{title: string, msg: string} | null>(null);
  const [jumpscare, setJumpscare] = useState(false);

  // Spawner Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Spawn Ads randomly (25% chance)
      if (Math.random() > 0.75) {
        const newAd = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 100),
          content: CURSED_ADS[Math.floor(Math.random() * CURSED_ADS.length)]
        };
        setActiveAds(prev => [...prev.slice(-4), newAd]); 
      }

      // 2. Spawn SCARY ENTITY (20% chance)
      if (Math.random() > 0.8) {
         const type = Math.random() > 0.5 ? 'void' : 'shadow';
         const newEntity = {
             id: Date.now() + Math.random(),
             x: Math.random() * (window.innerWidth - 200),
             y: Math.random() * (window.innerHeight - 300),
             type: type as 'void' | 'shadow'
         };
         setVoidEntities(prev => [...prev, newEntity]);
         
         // Remove entity after duration
         setTimeout(() => {
             setVoidEntities(prev => prev.filter(e => e.id !== newEntity.id));
         }, 2000);
      }

      // 3. Trigger Alert (10% chance)
      if (Math.random() > 0.9 && !alert) {
          const newAlert = ALERTS[Math.floor(Math.random() * ALERTS.length)];
          setAlert(newAlert);
          setTimeout(() => setAlert(null), 3000);
      }

      // 4. JUMPSCARE (1% chance very rare)
      if (Math.random() > 0.99) {
          setJumpscare(true);
          setTimeout(() => setJumpscare(false), 200);
      }

    }, 1500);

    return () => clearInterval(interval);
  }, [alert]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      
      {/* Visual Noise / CRT Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               animation: 'intenseShake 0.2s infinite'
           }}
      ></div>

      {/* RENDER JUMPSCARE */}
      <AnimatePresence>
          {jumpscare && <JumpscareFace />}
      </AnimatePresence>

      {/* RENDER ADS */}
      <AnimatePresence>
        {activeAds.map(ad => (
          <motion.div
            key={ad.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute p-1 bg-white border-4 border-dashed pointer-events-auto cursor-pointer shadow-2xl z-[50]"
            style={{ 
                left: ad.x, 
                top: ad.y,
                animation: 'arabicFlash 0.5s infinite',
                borderColor: Math.random() > 0.5 ? 'red' : 'yellow'
            }}
            onClick={() => {
                setActiveAds(prev => [...prev, {...ad, id: Date.now(), x: ad.x + 20, y: ad.y + 20}]);
            }}
          >
              <div className="flex flex-col items-center justify-center p-4 text-center arabic-font min-w-[200px]">
                 <h2 className="text-2xl font-black uppercase drop-shadow-md text-stroke">{ad.content.text}</h2>
                 <p className="text-xs font-bold mt-1 bg-black text-white px-2 py-1">{ad.content.sub}</p>
                 <div className="mt-2 text-3xl animate-bounce">⬇️ CLICK ⬇️</div>
              </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* RENDER VOID ENTITIES */}
      <AnimatePresence>
          {voidEntities.map(ent => (
              ent.type === 'void' ? 
                <VoidEntity key={ent.id} x={ent.x} y={ent.y} /> :
                <ShadowMan key={ent.id} x={ent.x} y={ent.y} />
          ))}
      </AnimatePresence>

      {/* RENDER ALERTS */}
      <AnimatePresence>
          {alert && (
              <motion.div 
                initial={{ y: -200, x: '-50%' }}
                animate={{ y: 50, x: '-50%' }}
                exit={{ y: -500, x: '-50%' }}
                className="absolute top-0 left-1/2 bg-gray-900 text-white p-4 rounded-xl border-4 border-red-500 shadow-[0_0_50px_red] w-[90%] max-w-md pointer-events-auto z-[200]"
                style={{ animation: 'shake 0.5s infinite' }}
              >
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl animate-pulse">
                          ⚠️
                      </div>
                      <div>
                          <h3 className="text-xl font-bold uppercase text-red-500">{alert.title}</h3>
                          <p className="font-mono text-sm">{alert.msg}</p>
                      </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-green-600 hover:bg-green-500 py-2 font-bold uppercase" onClick={() => setAlert(null)}>ACCEPT</button>
                      <button className="flex-1 bg-red-600 hover:bg-red-500 py-2 font-bold uppercase" onClick={() => setAlert(null)}>DENY</button>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

    </div>
  );
};

export default ChaosOverlay;
