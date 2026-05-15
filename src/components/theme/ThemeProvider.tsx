
import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeContextType {
  accentColor: string;
  fontFamily: 'Poppins' | 'System';
  isPureBlack: boolean;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: 'Poppins' | 'System') => void;
  setPureBlack: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('echo_accent') || '#ED5564');
  const [fontFamily, setFontFamily] = useState<'Poppins' | 'System'>(() => (localStorage.getItem('echo_font') as any) || 'Poppins');
  const [isPureBlack, setPureBlack] = useState(() => localStorage.getItem('echo_black') === 'true');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', accentColor);
    root.style.setProperty('--color-accent', accentColor);
    root.style.setProperty('--color-surface', isPureBlack ? '#000000' : '#121212');
    root.style.setProperty('--font-sans', fontFamily === 'Poppins' ? '"Poppins", ui-sans-serif' : 'ui-sans-serif');
    
    localStorage.setItem('echo_accent', accentColor);
    localStorage.setItem('echo_font', fontFamily);
    localStorage.setItem('echo_black', String(isPureBlack));
  }, [accentColor, fontFamily, isPureBlack]);

  return (
    <ThemeContext.Provider value={{ accentColor, fontFamily, isPureBlack, setAccentColor, setFontFamily, setPureBlack }}>
      <motion.div
        animate={{ color: isPureBlack ? '#fff' : '#fff' }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{ height: '100%' }}
      >
        {children}
      </motion.div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
