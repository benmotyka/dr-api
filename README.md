# Digital Resident API

Simple Express TypeScript API that provides simulated ETH price data.

## Features

- GET `/api/eth-price` endpoint
- Real ETH price as baseline with ±0-2% simulation
- 6-second price caching
- Rate limiting (10 requests/minute)
- CORS restricted to http://biliontowers.com

## Setup

1. Install dependencies:
```bash
npm install
```

2. Development mode:
```bash
npm run dev
```

3. Build and run:
```bash
npm run build
npm start
```

## API Response Format

```json
{
  "price": 3145.67,
  "lastUpdated": "2024-01-01T12:00:00.000Z",
  "up": true
}
```

The server runs on port 3000 by defalut. 