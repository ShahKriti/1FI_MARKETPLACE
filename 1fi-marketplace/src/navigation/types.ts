import { TabKey } from '../components/shop/BottomTabBar';

export type RootStackParamList = {
  ShopHome: undefined;
  // Generic stand-in for the four bottom-tab destinations out of this
  // assignment's scope (Home, EMI Dues, Limit, Profile), so the bottom tab
  // bar is never a dead tap.
  Placeholder: { title: string; tabKey: TabKey };
  ProductDetail: { productId: string };
  OrderConfirmation: {
    productName: string;
    productThumbnail: string;
    variantLabel: string;
    variantPrice: number;
    tenureMonths: number;
    monthlyAmount: number;
    totalPayable: number;
    isNoCostEmi: boolean;
    bankName: string;
  };
};
