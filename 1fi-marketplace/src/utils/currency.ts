export function formatINR(amount: number): string {
  return `\u20B9${Math.round(amount).toLocaleString('en-IN')}`;
}

export function discountPercent(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
