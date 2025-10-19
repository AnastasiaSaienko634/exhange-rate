'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { baseCurrency, hasHydrated, setBaseCurrency } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const error = () => {
      setBaseCurrency('USD');
    };
    const success = async ({ coords }: GeolocationPosition) => {
      try {
        const data = await getUserInfo(coords);
        console.log('User coords:', coords);
        setBaseCurrency(data);
      } catch (err) {
        console.log(err);
        error();
      }
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [baseCurrency, hasHydrated, setBaseCurrency]);

  return null;
}
