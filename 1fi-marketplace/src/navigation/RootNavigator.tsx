import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ShopHomeScreen } from '../screens/shop/ShopHomeScreen';
import { PlaceholderScreen } from '../screens/shop/PlaceholderScreen';
import { ProductDetailScreen } from '../screens/marketplace/ProductDetailScreen';
import { OrderConfirmationScreen } from '../screens/marketplace/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Native header is disabled everywhere — tab-root screens (Shop, Placeholder)
 * draw their own heading/hero, and drill-down screens (ProductDetail,
 * OrderConfirmation) use a floating circular back button instead of a bar,
 * matching the real app's minimal, borderless header style.
 */
export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ShopHome">
      <Stack.Screen name="ShopHome" component={ShopHomeScreen} />
      <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
}
