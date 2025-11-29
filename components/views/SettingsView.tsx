
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check, RefreshCw, Moon, Sun, Coffee } from 'lucide-react';
import { Theme } from '../../types';

interface SettingsViewProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentTheme, onThemeChange }) => {
  // Local state for custom theme colors
  const [customColors, setCustomColors] = useState({
    bgColor: '#ffffff',
    bgPaper: '#f3f4f6',
    textMain: '#111827',
    primary: '#3b82f6',
    accent: '#8b5cf6'
  });

  const handleColorChange = (key: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }));
    if (currentTheme === 'custom') {
        applyCustomTheme({ ...customColors, [key]: value });
    }
  };

  const applyCustomTheme = (colors: typeof customColors) => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', colors.bgColor);
    root.style.setProperty('--bg-paper', colors.bgPaper + 'CC'); // Add transparency
    root.style.setProperty('--text-main', colors.textMain);
    root.style.setProperty('--text-muted', colors.textMain + '99');
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--accent-color', colors.accent);
  };

  const activateCustomTheme = () => {
    applyCustomTheme(customColors);
    onThemeChange('custom');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-text-main flex items-center gap-3">
            <SettingsIcon />
            Настройки
        </h1>
        <p className="text-text-muted mt-2 text-lg">Персонализация интерфейса и тем</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preset Themes */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-4xl"
        >
            <h2 className="text-xl font-bold text-text-main mb-6">Готовые темы</h2>
            <div className="grid grid-cols-1 gap-4">
                <ThemeCard 
                    active={currentTheme === 'white'} 
                    onClick={() => onThemeChange('white')}
                    name="Светлая (Default)"
                    icon={Sun}
                    colors={['#f0f2f5', '#2d76f9', '#1f2937']}
                />
                <ThemeCard 
                    active={currentTheme === 'onyx'} 
                    onClick={() => onThemeChange('onyx')}
                    name="Onyx (Dark)"
                    icon={Moon}
                    colors={['#09090b', '#3b82f6', '#e4e4e7']}
                />
                 <ThemeCard 
                    active={currentTheme === 'catppuccin'} 
                    onClick={() => onThemeChange('catppuccin')}
                    name="Catppuccin"
                    icon={Coffee}
                    colors={['#1e1e2e', '#89b4fa', '#cdd6f4']}
                />
            </div>
        </motion.div>

        {/* Custom Theme Builder */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-4xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Palette className="w-40 h-40" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-xl font-bold text-text-main">Конструктор темы</h2>
                {currentTheme === 'custom' && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Активна</span>
                )}
            </div>

            <div className="space-y-6 relative z-10">
                <ColorInput label="Фон страницы" value={customColors.bgColor} onChange={(v) => handleColorChange('bgColor', v)} />
                <ColorInput label="Фон элементов (стекло)" value={customColors.bgPaper} onChange={(v) => handleColorChange('bgPaper', v)} />
                <ColorInput label="Основной текст" value={customColors.textMain} onChange={(v) => handleColorChange('textMain', v)} />
                <ColorInput label="Акцентный цвет (Primary)" value={customColors.primary} onChange={(v) => handleColorChange('primary', v)} />
                <ColorInput label="Доп. цвет (Accent)" value={customColors.accent} onChange={(v) => handleColorChange('accent', v)} />
            </div>

            <button 
                onClick={activateCustomTheme}
                className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                <Palette className="w-5 h-5" />
                Применить свою тему
            </button>
        </motion.div>
      </div>
    </div>
  );
};

const ThemeCard: React.FC<{ active: boolean; onClick: () => void; name: string; icon: any; colors: string[] }> = ({ active, onClick, name, icon: Icon, colors }) => (
    <button 
        onClick={onClick}
        className={`w-full p-4 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between group
            ${active ? 'border-primary bg-primary/5 shadow-lg' : 'border-transparent bg-bg-paper hover:bg-bg-paper/80'}
        `}
    >
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className={`font-bold ${active ? 'text-primary' : 'text-text-main'}`}>{name}</span>
        </div>
        <div className="flex gap-2">
            {colors.map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }}></div>
            ))}
        </div>
    </button>
);

const ColorInput: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between p-3 bg-bg-paper/50 rounded-2xl border border-border">
        <span className="font-medium text-text-main text-sm">{label}</span>
        <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted font-mono uppercase">{value}</span>
            <input 
                type="color" 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110"
            />
        </div>
    </div>
);

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
    )
}

export default SettingsView;
