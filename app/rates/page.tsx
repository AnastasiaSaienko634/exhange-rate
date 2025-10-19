'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import { getRates } from '@/lib/service/exchangeAPI';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import Loader from '@/components/Loader/Loader';
import RatesList from '@/components/RatesList/RatesList';

import css from './RatesPage.module.css';

export default function RatesPage() {
  const {
    baseCurrency,
    rates,
    setExchangeInfo,
    setError,
    setLoading,
    isLoading,
    isError,
    filter,
    setFilter,
  } = useCurrencyStore();

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      setLoading(true);
      try {
        const data = await getRates(baseCurrency);
        const result = Object.entries(data)
          .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
          .map(([key, value]) => ({
            key,
            value: (1 / (value as number)).toFixed(2),
          }));
        setExchangeInfo(result as any);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, filter, setExchangeInfo, setError, setLoading]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency || 'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          <input
            className={css.input}
            placeholder="Search currency"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          {isLoading && <Loader />}

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}

          {!isLoading && !isError && rates.length > 0 && <RatesList rates={rates} />}
        </Container>
      </Section>
    </main>
  );
}
