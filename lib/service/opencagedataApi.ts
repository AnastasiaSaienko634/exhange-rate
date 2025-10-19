import axios from 'axios';

const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export async function getCurrencyByCoords(lat: number, long: number): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
    const { data } = await axios.get(BASE_URL, {
      params: {
        q: `${lat}+${long}`,
        key: apiKey,
        language: 'en',
      },
    });

    return data.results[0].annotations.currency.iso_code;
  } catch (error) {
    console.error('Cannot get currency by coordinates:', error);
    return 'USD'; // fallback
  }
}
