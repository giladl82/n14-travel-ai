'use client';
import { type Country } from '@/services/countries';
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

type TripPlanContextType = {
  plan: string | null;
  error: Error | null;
  reset: () => void;
  setPlan: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
};

const TripPlanContext = createContext<TripPlanContextType | undefined>(undefined);

type TripPlanProviderProps = {
  children: ReactNode;
  initialTripPlan: string;
};

export function TripPlanProvider({ children, initialTripPlan }: TripPlanProviderProps) {
  const [plan, setPlan] = useState<string | null>(initialTripPlan);
  const [error, setError] = useState<Error | null>(null);
  const reset = () => {
    setError(null);
    setPlan(null);
  };

  return (
    <TripPlanContext.Provider value={{ plan, error, reset, setPlan, setError }}>{children}</TripPlanContext.Provider>
  );
}

export const useTripPlan = () => {
  const context = useContext(TripPlanContext);

  if (!context) {
    throw new Error('TripPlanContext is undefined');
  }

  return context;
};
