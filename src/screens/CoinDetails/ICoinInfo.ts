
export interface ICoinInfo {
  id: string;
  symbol: string;
  name: string;
  block_time_in_minutes: number;
  categories: string[];
  description: {
    en: string;
  },
  image: {
    thumb: string;
    small: string;
    large: string;
  },
  genesis_date: string;
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
      gbp: number;
      eur: number;
    },
    roi: number;
    ath:  {
      usd: number;
      gbp: number;
      eur: number;
    },
    ath_change_percentage: {
      usd: number;
      gbp: number;
      eur: number;
    },
    ath_date: {
      usd: string;
      gbp: string;
      eur: string;
    },
    market_cap: {
      usd: number;
      gbp: number;
      eur: number;
    },
    total_volume: any|object;
    high_24h: {
      usd: number;
      gbp: number;
      eur: number;
    },
    low_24h: {
      usd: number;
      gbp: number;
      eur: number;
    },
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    total_supply: number;
    circulating_supply: number;
    last_updated: string;
  }
}