import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CustomizeModalProps {
  onClose: () => void;
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({ onClose }) => {
  const { isDarkMode, customization, updateCustomization } = useDarkMode();
  const [selectedTheme, setSelectedTheme] = useState(customization.theme);
  const [selectedColor, setSelectedColor] = useState(customization.accentColor);
  const [selectedFont, setSelectedFont] = useState(customization.fontFamily);
  const [animationsEnabled, setAnimationsEnabled] = useState(customization.animationsEnabled);

  // Sync local state when customization changes (e.g., from reset)
  useEffect(() => {
    setSelectedTheme(customization.theme);
    setSelectedColor(customization.accentColor);
    setSelectedFont(customization.fontFamily);
    setAnimationsEnabled(customization.animationsEnabled);
  }, [customization]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleApplyChanges = () => {
    // Apply all customization changes
    updateCustomization({
      theme: selectedTheme,
      accentColor: selectedColor,
      fontFamily: selectedFont,
      animationsEnabled: animationsEnabled
    });
    
    // Show success message
    alert('🎨 Customization applied! Your preferences have been saved!');
    onClose();
  };

  const handleResetToDefault = () => {
    // Get the current active theme (not the selected one, but the actual active theme)
    const currentTheme: 'light' | 'dark' = isDarkMode ? 'dark' : 'light';
    const themeText = isDarkMode ? 'dark mode' : 'light mode';
    
    if (confirm(`🔄 Are you sure you want to reset to default ${themeText} settings? This will restore the original orange theme and Verdana font.`)) {
      // Force a complete update by passing all properties explicitly
      // This ensures React detects the change even if some values are the same
      const defaultSettings = {
        theme: currentTheme as 'light' | 'dark',
        accentColor: '#FF9900',
        fontFamily: 'Verdana',
        animationsEnabled: true
      };
      
      // Update customization context - this will trigger re-renders in all components
      updateCustomization(defaultSettings);
      
      // Update local state to reflect the reset
      setSelectedTheme(currentTheme);
      setSelectedColor(defaultSettings.accentColor);
      setSelectedFont(defaultSettings.fontFamily);
      setAnimationsEnabled(defaultSettings.animationsEnabled);
      
      // Force a small delay to ensure state has propagated
      requestAnimationFrame(() => {
        alert(`🔄 Reset to default! Your profile is back to the classic MySpace ${themeText} look!`);
        onClose();
      });
    }
  };

  const colorOptions = [
    { name: 'MySpace Orange', value: '#FF9900' },
    { name: 'Hot Pink', value: '#FF69B4' },
    { name: 'Electric Blue', value: '#00BFFF' },
    { name: 'Lime Green', value: '#32CD32' },
    { name: 'Purple', value: '#8A2BE2' },
    { name: 'Red', value: '#FF4444' }
  ];

  const fontOptions = [
    { name: 'Verdana (Classic)', value: 'Verdana' },
    { name: 'Arial', value: 'Arial' },
    { name: 'Comic Sans', value: 'Comic Sans MS' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Courier New', value: 'Courier New' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className={`w-full max-w-lg mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar */}
        <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
          <span className="text-sm">🎨 Customize Jessica's Profile</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          <h3 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Make it your own! 🎨</h3>
          
          {/* Theme Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Theme:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTheme('light')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedTheme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ☀️ Light Mode
              </button>
              <button
                onClick={() => setSelectedTheme('dark')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedTheme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Accent Color:</label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-2 rounded text-xs font-medium transition-all ${
                    selectedColor === color.value 
                      ? 'ring-2 ring-blue-500 scale-105' 
                      : 'hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: color.value,
                    color: color.value === '#FF9900' || color.value === '#32CD32' ? '#000' : '#fff'
                  }}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Font Style:</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className={`w-full p-2 border rounded text-sm ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-100 border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
              style={{ fontFamily: selectedFont }}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {/* Animations Toggle */}
          <div className="mb-6">
            <label className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                className="mr-2"
              />
              ✨ Enable Animations & Effects
            </label>
          </div>

          {/* Preview */}
          <div className={`mb-6 p-3 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Preview:</h4>
            <div 
              className="p-2 rounded text-xs"
              style={{ 
                backgroundColor: selectedTheme === 'dark' ? '#1f2937' : '#f9fafb',
                color: selectedTheme === 'dark' ? '#e5e7eb' : '#111827',
                fontFamily: selectedFont
              }}
            >
              <span style={{ color: selectedColor, fontWeight: 'bold' }}>Jessica Calderon</span> - Senior Software Engineer
              <br />
              <span style={{ color: selectedColor }}>✨ Customized just for you!</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium transition-colors"
            >
              🔄 Reset to Default
            </button>
            <button
              onClick={handleApplyChanges}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
            >
              Apply Changes 🎨
            </button>
          </div>

          {/* Fun Note */}
          <div className={`mt-4 text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>💡 Your customization will be saved for future visits!</p>
            <p className="mt-1">
              {selectedTheme === 'light' && selectedColor === '#FF9900' && selectedFont === 'Verdana' && animationsEnabled ? 
                '🎯 Currently showing default MySpace settings' : 
                '✨ Custom settings active'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
