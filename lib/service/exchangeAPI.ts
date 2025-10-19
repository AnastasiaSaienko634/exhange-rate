import axios from 'axios';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

export async function convertCurrency(from: string, to: string, amount: number) {
  const { data } = await axios.get(`${BASE_URL}/convert`, {
    params: { from, to, amount },
    headers: { apikey: apiKey },
  });
  return data;
}

export async function getRates(base: string) {
  const { data } = await axios.get(`${BASE_URL}/latest`, {
    params: { base },
    headers: { apikey: apiKey },
  });
  return data.rates;
}
