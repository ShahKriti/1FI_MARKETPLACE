import { useAsync } from './useAsync';
import { fetchEmiPlans } from '../data/mockApi';
import { EMIPlanTemplate } from '../data/types';

/**
 * Refetches whenever the selected variant's price changes, so switching
 * variants on the product page re-triggers a (simulated) EMI recalculation
 * against the new principal, complete with its own loading state.
 */
export function useEmiPlans(productId: string, principal: number, templates: EMIPlanTemplate[]) {
  return useAsync(
    () => fetchEmiPlans(productId, principal, templates),
    [productId, principal, templates]
  );
}
