// lib\stores\currencyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
