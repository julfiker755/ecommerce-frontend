'use client';

import React, { createContext, useContext, useState } from 'react';

interface TitleContextType {
  title: string;
  subtitle: string;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
}

const TitleContext = createContext<TitleContextType>({
  title: '',
  subtitle: '',
  setTitle: () => { },
  setSubtitle: () => { },
});

export function TitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Dashboard Overview');
  const [subtitle, setSubtitle] = useState('See total overviews and monitor all statistics from here.');

  return (
    <TitleContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle() {
  return useContext(TitleContext);
}
