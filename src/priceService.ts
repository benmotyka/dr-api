import axios from 'axios';
import { CachedPrice, EthPriceResponse } from './types';

class PriceService {
  private cachedPrice: CachedPrice | null = null;
  private readonly CACHE_DURATION = 6000; // 6 seconds
  private realEthPrice: number | null = null;

  async initialize(): Promise<void> {
    console.log('Initializing price service...');
    this.realEthPrice = await this.getRealEthPrice();
    console.log(`Initial ETH price: $${this.realEthPrice}`);
  }

  async getRealEthPrice(): Promise<number> {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      return response.data.ethereum.usd;
    } catch (error) {
      console.error('Failed to fetch real ETH price:', error);
      return 3000;
    }
  }

  async getEthPrice(): Promise<EthPriceResponse> {
    const now = Date.now();
    
    if (this.cachedPrice && (now - this.cachedPrice.timestamp) < this.CACHE_DURATION) {
      console.log(`Returning cached price: $${this.cachedPrice.price}`);
      return {
        price: this.cachedPrice.price,
        lastUpdated: new Date(this.cachedPrice.timestamp).toISOString(),
        up: this.cachedPrice.price > this.cachedPrice.previousPrice
      };
    }

    console.log('Cache expired, generating new price...');
    
    if (!this.realEthPrice) {
      this.realEthPrice = await this.getRealEthPrice();
    }

    const previousPrice = this.cachedPrice?.price || this.realEthPrice;
    const changePercent = (Math.random() - 0.5) * 0.04;
    const newPrice = Math.round((this.realEthPrice * (1 + changePercent)) * 100) / 100;

    console.log(`New simulated price: $${newPrice} (${changePercent >= 0 ? '+' : ''}${(changePercent * 100).toFixed(2)}% change)`);

    this.cachedPrice = {
      price: newPrice,
      timestamp: now,
      previousPrice
    };

    return {
      price: newPrice,
      lastUpdated: new Date(now).toISOString(),
      up: newPrice > previousPrice
    };
  }
}

export const priceService = new PriceService(); 