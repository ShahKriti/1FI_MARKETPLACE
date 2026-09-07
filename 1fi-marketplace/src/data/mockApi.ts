import { MOCK_PRODUCTS } from './mockProducts';
import { ProductSummary, ProductDetail, EMIPlanTemplate, ComputedEMIPlan } from './types';
import { computeEmiPlans } from '../utils/emiCalculator';

/**
 * Stand-in for the real product/EMI backend. Every function here returns a
 * Promise and goes through the same delay/failure simulation a real fetch()
 * call would — so screens are written against the *shape* of an API
 * (loading -> success | error), not against synchronous local data. Swapping
 * these for real `fetch(...)` calls to the 1Fi backend should not require any
 * screen or hook changes.
 */
export const MOCK_API_CONFIG = {
  networkDelayMs: 700,
  // Set to a value > 0 to exercise the error states while testing, e.g. 1
  // fails every request, 0.2 fails ~20% of requests.
  simulatedFailureRate: 0,
};

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_API_CONFIG.networkDelayMs));
}

function maybeFail(context: string) {
  if (Math.random() < MOCK_API_CONFIG.simulatedFailureRate) {
    throw new Error(`Could not load ${context}. Please check your connection and try again.`);
  }
}

function toSummary(product: ProductDetail): ProductSummary {
  const { id, name, brand, category, thumbnail, startingPrice, hasNoCostEmi } = product;
  return { id, name, brand, category, thumbnail, startingPrice, hasNoCostEmi };
}

export async function fetchProductSummaries(): Promise<ProductSummary[]> {
  maybeFail('marketplace products');
  return delay(MOCK_PRODUCTS.map(toSummary));
}

export async function fetchProductDetail(productId: string): Promise<ProductDetail> {
  maybeFail('product details');
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new Error('This product is no longer available.');
  }
  return delay(product);
}

export async function fetchEmiPlans(
  productId: string,
  principal: number,
  templates: EMIPlanTemplate[]
): Promise<ComputedEMIPlan[]> {
  maybeFail('EMI options');
  // In a real backend, EMI eligibility/rates are computed server-side per
  // product + principal (they can depend on live bank offers, user credit
  // limit, etc). Here we compute locally against the mock templates, but the
  // call shape (async, keyed by product + principal) matches what a real
  // integration would look like.
  return delay(computeEmiPlans(templates, principal));
}
