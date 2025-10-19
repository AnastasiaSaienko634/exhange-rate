import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

type CurrencyState = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: boolean;
  rates: any[];
  filter: string;
  setFilter: (f: string) => void;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setLoading: (state: boolean) => void;
  setError: (state: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      exchangeInfo: null,
      isLoading: false,
      isError: false,
      rates: [],
      filter: '',
      setFilter: (f) => set({ filter: f }),
      setExchangeInfo: (info) => set({ exchangeInfo: info }),
      setLoading: (state) => set({ isLoading: state }),
      setError: (state) => set({ isError: state }),
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
