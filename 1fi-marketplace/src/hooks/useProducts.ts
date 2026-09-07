import { useAsync } from './useAsync';
import { fetchProductSummaries } from '../data/mockApi';

export function useProducts() {
  return useAsync(() => fetchProductSummaries(), []);
}
