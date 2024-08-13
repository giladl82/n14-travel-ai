'use client';
import { TripDetailsType } from '@/lib/schema';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

type TripPlanState = {
  plan: string | null;
  details: TripDetailsType | null;
  error: Error | null;
};

type TripPlanModifiers = {
  setTripPlan: (plan: string | null) => void;
  setDetails: (details: TripDetailsType | null) => void;
  setError: (error: Error) => void;
  reset: () => void;
};

export const defaultInitState: TripPlanState = {
  details: null,
  error: null,
  plan: null,
};

export type TripPlanStore = TripPlanState & TripPlanModifiers;

export const createTripPlanStore = (initState: TripPlanState = defaultInitState) => {
  return createStore<TripPlanStore>()((set) => ({
    ...initState,
    setTripPlan: (chunk: string | null) =>
      set((state) => ({
        plan: (state.plan ?? '') + (chunk ?? ''),
        error: null,
      })),
    setDetails: (details: TripDetailsType | null) => set((state) => ({ ...state, details: details, error: null })),
    setError: (error: Error) => set({ error, plan: null }),
    reset: () => set({ plan: null, error: null }),
  }));
};

export type TripPlanStoreApi = ReturnType<typeof createTripPlanStore>;

export const TripPlanStoreContext = createContext<TripPlanStoreApi | undefined>(undefined);

export type TripPlanStoreProviderProps = {
  children: ReactNode;
  plan: string | null;
  details: TripDetailsType | null;
};

let storeRef: TripPlanStoreApi;
export const TripPlanStoreProvider = ({ plan, details, children }: TripPlanStoreProviderProps) => {
  if (!storeRef) {
    storeRef = createTripPlanStore({
      details,
      plan,
      error: null,
    });
  }

  return <TripPlanStoreContext.Provider value={storeRef}>{children}</TripPlanStoreContext.Provider>;
};

export const useTripPlanStore = <T,>(selector: (store: TripPlanStore) => T): T => {
  const counterStoreContext = useContext(TripPlanStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useTripPlanStore must be used within TripPlanStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
