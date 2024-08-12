'use client';
import { type Country } from '@/services/countries';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type CountriesContextType = {
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
};

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

type CountriesProviderProps = {
  children: ReactNode;
  initialCountries: Country[];
};

export function CountriesProvider({ children, initialCountries }: CountriesProviderProps) {
  const [countries, setCountries] = useState<Country[]>(initialCountries);

  return <CountriesContext.Provider value={{ countries, setCountries }}>{children}</CountriesContext.Provider>;
}

export const useCountries = () => {
  const context = useContext(CountriesContext);

  if (!context) {
    throw new Error('Countries context is undefined');
  }

  return context;
};
