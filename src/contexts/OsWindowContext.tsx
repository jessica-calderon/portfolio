import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Major OS-style windows that replace each other (one at a time).
 * Accessibility Options stays outside this stack so it remains reachable.
 */
export type MajorOsWindow =
  | 'none'
  | 'aim'
  | 'resume'
  | 'legacyIe'
  | 'networkPlaces'
  | 'favorites'
  | 'share'
  | 'clipboardAlert'
  | 'rating'
  | 'scheduleCall';

interface OsWindowContextValue {
  active: MajorOsWindow;
  open: (window: MajorOsWindow) => void;
  close: () => void;
  isOpen: (window: MajorOsWindow) => boolean;
}

const OsWindowContext = createContext<OsWindowContextValue | null>(null);

export const OsWindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<MajorOsWindow>('none');

  const open = useCallback((window: MajorOsWindow) => {
    setActive(window);
  }, []);

  const close = useCallback(() => {
    setActive('none');
  }, []);

  const isOpen = useCallback((window: MajorOsWindow) => active === window, [active]);

  const value = useMemo(
    () => ({ active, open, close, isOpen }),
    [active, open, close, isOpen]
  );

  return <OsWindowContext.Provider value={value}>{children}</OsWindowContext.Provider>;
};

export function useOsWindow(): OsWindowContextValue {
  const ctx = useContext(OsWindowContext);
  if (!ctx) {
    throw new Error('useOsWindow must be used within OsWindowProvider');
  }
  return ctx;
}
