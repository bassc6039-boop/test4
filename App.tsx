
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import JournalView from './components/views/JournalView';
import DashboardView from './components/views/DashboardView';
import ScheduleView from './components/views/ScheduleView';
import PerformanceView from './components/views/PerformanceView';
import LibraryView from './components/views/LibraryView';
import CoursesView from './components/views/CoursesView';
import AnnouncementsView from './components/views/AnnouncementsView';
import ShopView from './components/views/ShopView';
import RewardsView from './components/views/RewardsView';
import ReviewsView from './components/views/ReviewsView';
import PaymentsView from './components/views/PaymentsView';
import ProfileView from './components/views/ProfileView';
import SettingsView from './components/views/SettingsView';
import { FAQView, ContactsView, SupportView, ComplaintsView } from './components/views/SupportPages';
import BackgroundDots from './components/BackgroundDots';
import ChaosOverlay from './components/ChaosOverlay';
import { ViewType, Theme } from './types';
import { CURRENT_USER } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

// Context for Theme
export const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'white', setTheme: () => {} });

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>('white');

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    // Reset classes
    root.removeAttribute('data-theme');
    
    if (theme !== 'white') {
        root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // --- DESTRUCTION LOGIC ---
  const handleDestruction = () => {
    // 1. Shake the screen
    document.body.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
    document.body.style.transform = 'translate3d(0, 0, 0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';

    // 2. Select all interactive/visible elements to "break"
    const elements = document.querySelectorAll('div, p, span, img, button, a, h1, h2, h3, h4, li, tr');
    
    elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        // Skip the self-destruct button itself so it remains visible
        if (htmlEl.id === 'self-destruct-btn') return;

        // Random physics values
        const randomX = (Math.random() - 0.5) * 400; // Scatter X
        const randomY = 500 + Math.random() * 1000; // Fall down Y
        const randomRotate = (Math.random() - 0.5) * 360; // Spin
        const randomDelay = Math.random() * 0.5; // Stagger
        const randomDuration = 0.5 + Math.random(); // Varied speed

        htmlEl.style.transition = `all ${randomDuration}s cubic-bezier(0.5, 0, 1, 1) ${randomDelay}s`;
        htmlEl.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        htmlEl.style.opacity = '0';
        htmlEl.style.pointerEvents = 'none';
    });

    // 3. Optional: Reset after 5 seconds
    setTimeout(() => {
        location.reload(); 
    }, 5000);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'schedule': return <ScheduleView />;
      case 'journal': return <JournalView />;
      case 'performance': return <PerformanceView />;
      case 'library': return <LibraryView />;
      case 'courses': return <CoursesView />;
      case 'announcements': return <AnnouncementsView />;
      case 'shop': return <ShopView />;
      case 'rewards': return <RewardsView />;
      case 'reviews': return <ReviewsView />;
      case 'payment': return <PaymentsView />;
      case 'profile': return <ProfileView />;
      case 'settings': return <SettingsView currentTheme={theme} onThemeChange={setTheme} />;
      case 'faq': return <FAQView />;
      case 'contacts': return <ContactsView />;
      case 'appeals': return <SupportView />;
      case 'complaints': return <ComplaintsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/30 text-text-main">
        
        {/* --- CHAOS OVERLAY (ARABICFUNNY/MEME) --- */}
        <ChaosOverlay />

        {/* --- SELF DESTRUCT BUTTON --- */}
        <button
            id="self-destruct-btn"
            onClick={handleDestruction}
            className="fixed top-0 left-1/2 z-[100] px-8 py-4 text-2xl font-black text-white uppercase tracking-widest rounded-b-xl border-x-4 border-b-4 border-yellow-400 cursor-pointer"
            style={{
                transform: 'translateX(-50%)',
                animation: 'flagFlash 0.5s infinite linear, fireGlow 0.8s infinite alternate ease-in-out',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
        >
            ⚠️ НЕ НАЖИМАТЬ ⚠️
        </button>

        {/* Animated Background */}
        <BackgroundDots theme={theme} />
        
        {/* Navigation */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentView={currentView} 
          onNavigate={setCurrentView}
          currentTheme={theme}
          onThemeChange={setTheme}
        />

        {/* Main Content Area */}
        {/* Added margin-left (ml-80) to account for the fixed width floating sidebar */}
        <div className={`transition-all duration-300 relative z-10 ${isSidebarOpen ? 'ml-80' : 'ml-28'} mr-4 pt-16`}>
          
          <Header 
            user={CURRENT_USER} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />

          <main className="pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-7xl mx-auto"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
