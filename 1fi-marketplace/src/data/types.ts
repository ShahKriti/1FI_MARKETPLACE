export interface ProductVariant {
  id: string;
  label: string; // e.g. "8GB / 128GB / Midnight Black"
  price: number;
  mrp?: number;
  inStock: boolean;
}

export interface EMIPlanTemplate {
  id: string;
  bankName: string;
  tenureMonths: number;
  interestRatePercent: number; // annual, reducing balance
  processingFee: number;
  isNoCostEmi: boolean;
}

export interface ComputedEMIPlan extends EMIPlanTemplate {
  principal: number;
  monthlyAmount: number;
  totalInterest: number;
  totalPayable: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  thumbnail: string;
  startingPrice: number;
  hasNoCostEmi: boolean;
}

export interface ProductDetail extends ProductSummary {
  images: string[];
  description: string;
  rating: number;
  ratingCount: number;
  highlights: string[];
  variants: ProductVariant[];
  emiPlanTemplates: EMIPlanTemplate[];
}
