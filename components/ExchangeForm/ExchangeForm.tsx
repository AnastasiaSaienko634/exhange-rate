'use client';

import { useState } from 'react';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { convertCurrency } from '@/lib/service/exchangeAPI';
import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pattern = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;
    if (!pattern.test(value)) {
      alert('Invalid format! Example: 15 USD in UAH');
      return;
    }

    const [amountStr, from, , to] = value.split(' ');
    const amount = parseFloat(amountStr);

    try {
      const data = await convertCurrency(from, to, amount);
      setResult(data.result);
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        placeholder="15 USD in UAH"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />

      {result !== null && <p className={styles.result}>Result: {result}</p>}
    </form>
  );
}
