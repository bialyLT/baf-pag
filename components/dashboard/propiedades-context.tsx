"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { Propiedad } from '@/types';

interface PropiedadesContextType {
  propiedades: Propiedad[];
}

const PropiedadesContext = createContext<PropiedadesContextType | null>(null);

interface PropiedadesProviderProps {
  children: ReactNode;
  propiedades: Propiedad[];
}

export function PropiedadesProvider({ children, propiedades }: PropiedadesProviderProps) {
  return (
    <PropiedadesContext.Provider value={{ propiedades }}>
      {children}
    </PropiedadesContext.Provider>
  );
}

export function usePropiedades() {
  const context = useContext(PropiedadesContext);
  return context?.propiedades || [];
}
