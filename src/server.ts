import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { priceService } from './priceService';

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const corsOptions = {
  origin: 'http://biliontowers.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

app.get('/api/eth-price', async (req, res) => {
  try {
    const priceData = await priceService.getEthPrice();
    res.json(priceData);
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    res.status(500).json({ error: 'Failed to fetch ETH price' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await priceService.initialize();
}); 