import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26 },
  h3: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  bodyMedium: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  captionMedium: { fontSize: 12, fontWeight: '600', lineHeight: 16 },
  price: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
  priceStrike: { fontSize: 13, fontWeight: '400', lineHeight: 18, textDecorationLine: 'line-through' },
  button: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
};
