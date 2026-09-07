import { ProductDetail } from './types';

// In a real integration this file disappears entirely — fetchProductSummaries /
// fetchProductDetail in mockApi.ts would call the actual product & EMI service.
// It exists here purely as a stand-in data source so the mock API has
// something realistic to serve, per the assignment's "mock APIs/data sources"
// allowance.
export const MOCK_PRODUCTS: ProductDetail[] = [
  {
    id: 'p1',
    name: 'Galaxy Nova 5G',
    brand: 'Orion',
    category: 'Smartphones',
    thumbnail: 'https://picsum.photos/seed/nova5g/400/400',
    images: [
      'https://picsum.photos/seed/nova5g-1/800/800',
      'https://picsum.photos/seed/nova5g-2/800/800',
      'https://picsum.photos/seed/nova5g-3/800/800',
    ],
    description:
      'A flagship 5G smartphone with a 120Hz AMOLED display, all-day battery, and a triple camera system tuned for low-light photography.',
    rating: 4.4,
    ratingCount: 2318,
    startingPrice: 24999,
    hasNoCostEmi: true,
    highlights: [
      '120Hz AMOLED display',
      '5000mAh battery, 67W fast charging',
      'Triple rear camera, 50MP primary',
      '1 year warranty + 6 months screen protection',
    ],
    variants: [
      { id: 'p1-v1', label: '8GB / 128GB · Midnight Black', price: 24999, mrp: 27999, inStock: true },
      { id: 'p1-v2', label: '8GB / 256GB · Midnight Black', price: 27999, mrp: 30999, inStock: true },
      { id: 'p1-v3', label: '12GB / 256GB · Aurora Blue', price: 30999, mrp: 33999, inStock: false },
    ],
    emiPlanTemplates: [
      { id: 'e1', bankName: '1Fi No Cost EMI', tenureMonths: 3, interestRatePercent: 0, processingFee: 0, isNoCostEmi: true },
      { id: 'e2', bankName: '1Fi No Cost EMI', tenureMonths: 6, interestRatePercent: 0, processingFee: 0, isNoCostEmi: true },
      { id: 'e3', bankName: 'HDFC Bank', tenureMonths: 9, interestRatePercent: 13, processingFee: 199, isNoCostEmi: false },
      { id: 'e4', bankName: 'HDFC Bank', tenureMonths: 12, interestRatePercent: 14, processingFee: 199, isNoCostEmi: false },
    ],
  },
  {
    id: 'p2',
    name: 'AeroBook Slim 14"',
    brand: 'Vantage',
    category: 'Laptops',
    thumbnail: 'https://picsum.photos/seed/aerobook/400/400',
    images: [
      'https://picsum.photos/seed/aerobook-1/800/800',
      'https://picsum.photos/seed/aerobook-2/800/800',
    ],
    description:
      'An ultra-portable 14" laptop built for everyday productivity — lightweight magnesium body, all-day battery, and a crisp 1080p display.',
    rating: 4.2,
    ratingCount: 864,
    startingPrice: 54999,
    hasNoCostEmi: true,
    highlights: [
      'Intel Core i5, 12th Gen',
      '16GB RAM · 512GB SSD',
      '1.2kg magnesium alloy body',
      'Up to 11 hours battery life',
    ],
    variants: [
      { id: 'p2-v1', label: 'i5 / 16GB / 512GB · Silver', price: 54999, mrp: 59999, inStock: true },
      { id: 'p2-v2', label: 'i7 / 16GB / 1TB · Space Grey', price: 68999, mrp: 74999, inStock: true },
    ],
    emiPlanTemplates: [
      { id: 'e1', bankName: '1Fi No Cost EMI', tenureMonths: 6, interestRatePercent: 0, processingFee: 0, isNoCostEmi: true },
      { id: 'e2', bankName: 'ICICI Bank', tenureMonths: 9, interestRatePercent: 12.5, processingFee: 249, isNoCostEmi: false },
      { id: 'e3', bankName: 'ICICI Bank', tenureMonths: 18, interestRatePercent: 13.5, processingFee: 249, isNoCostEmi: false },
      { id: 'e4', bankName: 'ICICI Bank', tenureMonths: 24, interestRatePercent: 14, processingFee: 249, isNoCostEmi: false },
    ],
  },
  {
    id: 'p3',
    name: 'FrostAir 1.5 Ton Split AC',
    brand: 'Frostline',
    category: 'Appliances',
    thumbnail: 'https://picsum.photos/seed/frostair/400/400',
    images: [
      'https://picsum.photos/seed/frostair-1/800/800',
      'https://picsum.photos/seed/frostair-2/800/800',
    ],
    description:
      '5-star rated inverter split AC with fast cooling and low power consumption — built for Indian summers.',
    rating: 4.1,
    ratingCount: 1532,
    startingPrice: 34990,
    hasNoCostEmi: false,
    highlights: [
      '5-star energy rating (BEE)',
      'Inverter compressor, fast cooling',
      'Anti-bacterial filter',
      '10 year compressor warranty',
    ],
    variants: [
      { id: 'p3-v1', label: '1.5 Ton · White', price: 34990, mrp: 41990, inStock: true },
      { id: 'p3-v2', label: '2 Ton · White', price: 41990, mrp: 47990, inStock: true },
    ],
    emiPlanTemplates: [
      { id: 'e1', bankName: 'SBI Card', tenureMonths: 6, interestRatePercent: 11, processingFee: 149, isNoCostEmi: false },
      { id: 'e2', bankName: 'SBI Card', tenureMonths: 12, interestRatePercent: 12, processingFee: 149, isNoCostEmi: false },
      { id: 'e3', bankName: 'SBI Card', tenureMonths: 18, interestRatePercent: 13, processingFee: 149, isNoCostEmi: false },
    ],
  },
  {
    id: 'p4',
    name: 'PulseFit Watch 2',
    brand: 'Pulse',
    category: 'Wearables',
    thumbnail: 'https://picsum.photos/seed/pulsefit/400/400',
    images: [
      'https://picsum.photos/seed/pulsefit-1/800/800',
      'https://picsum.photos/seed/pulsefit-2/800/800',
    ],
    description:
      'A smartwatch with continuous heart-rate tracking, SpO2, and a 14-day battery — built to survive the gym and the boardroom.',
    rating: 4.5,
    ratingCount: 4021,
    startingPrice: 4999,
    hasNoCostEmi: true,
    highlights: [
      '14-day battery life',
      '24x7 heart rate & SpO2 tracking',
      '5 ATM water resistance',
      '100+ sport modes',
    ],
    variants: [
      { id: 'p4-v1', label: 'Standard · Jet Black', price: 4999, mrp: 6999, inStock: true },
      { id: 'p4-v2', label: 'Premium · Rose Gold', price: 6499, mrp: 8999, inStock: true },
    ],
    emiPlanTemplates: [
      { id: 'e1', bankName: '1Fi No Cost EMI', tenureMonths: 3, interestRatePercent: 0, processingFee: 0, isNoCostEmi: true },
      { id: 'e2', bankName: 'Axis Bank', tenureMonths: 6, interestRatePercent: 13, processingFee: 99, isNoCostEmi: false },
    ],
  },
];
