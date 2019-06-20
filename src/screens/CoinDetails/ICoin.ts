export interface ICoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    current_price: number;
};