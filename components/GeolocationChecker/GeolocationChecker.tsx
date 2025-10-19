'use client';
import { useEffect } from 'react';
import { getCurrencyByCoords } from '../../lib/service/opencagedataApi';
import { useCurrencyStore } from '../../lib/store/currencyStore';

export default function GeolocationChecker() {
  const { baseCurrency, setBaseCurrency, hasHydrated } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const currency = await getCurrencyByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setBaseCurrency(currency);
        } catch {
          setBaseCurrency('USD');
        }
      },
      () => setBaseCurrency('USD')
    );
  }, [hasHydrated, baseCurrency]);

  return null;
}
