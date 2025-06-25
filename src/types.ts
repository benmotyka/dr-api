export interface EthPriceResponse {
  price: number;
  lastUpdated: string;
  up: boolean;
}

export interface CachedPrice {
  price: number;
  timestamp: number;
  previousPrice: number;
} 