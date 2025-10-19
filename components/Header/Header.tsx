'use client';

import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useCurrencyStore } from '@/lib/store/currencyStore';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { baseCurrency, setBaseCurrency } = useCurrencyStore();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <MdCurrencyExchange className={styles.logo} />

        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
                Rates
              </Link>
            </li>
          </ul>
        </nav>
    <select
          className={styles.select}
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
    </header>
  );
}
