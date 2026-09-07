import { useAsync } from './useAsync';
import { fetchProductDetail } from '../data/mockApi';

export function useProductDetail(productId: string) {
  return useAsync(() => fetchProductDetail(productId), [productId]);
}
