import React, { createContext, useContext, useState, useEffect } from 'react';

interface CustomizationSettings {
  theme: 'light' | 'dark';
  accentColor: string;
  fontFamily: string;
  animationsEnabled: boolean;
}

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  customization: CustomizationSettings;
  updateCustomization: (settings: Partial<CustomizationSettings>) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [customization, setCustomization] = useState<CustomizationSettings>(() => {
    const saved = localStorage.getItem('portfolioCustomization');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        theme: parsed.theme || (isDarkMode ? 'dark' : 'light'),
        accentColor: parsed.accentColor || '#FF9900',
        fontFamily: parsed.fontFamily || 'Verdana',
        animationsEnabled: parsed.animationsEnabled !== false
      };
    }
    return {
      theme: isDarkMode ? 'dark' : 'light',
      accentColor: '#FF9900',
      fontFamily: 'Verdana',
      animationsEnabled: true
    };
  });

  useEffect(() => {
    // Save to localStorage whenever dark mode changes
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Update the document class for Tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Apply customization settings to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--accent-color', customization.accentColor);
    root.style.setProperty('--font-family', customization.fontFamily);
    
    // Apply animations
    if (customization.animationsEnabled) {
      root.classList.add('animations-enabled');
    } else {
      root.classList.remove('animations-enabled');
    }

    // Save customization to localStorage
    localStorage.setItem('portfolioCustomization', JSON.stringify(customization));
  }, [customization]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateCustomization = (settings: Partial<CustomizationSettings>) => {
    setCustomization(prev => ({ ...prev, ...settings }));
    
    // Update dark mode if theme changed
    if (settings.theme && settings.theme !== (isDarkMode ? 'dark' : 'light')) {
      setIsDarkMode(settings.theme === 'dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      customization, 
      updateCustomization 
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};
