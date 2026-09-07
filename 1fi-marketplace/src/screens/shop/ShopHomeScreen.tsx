import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { EmptyState } from '../../components/common/EmptyState';
import { ShopTopSection } from '../../components/shop/ShopTopSection';
import { MarketplaceSection } from '../../components/marketplace/MarketplaceSection';
import { BottomTabBar, TabKey } from '../../components/shop/BottomTabBar';
import { Segment } from '../../components/shop/SegmentedTabs';

type Props = NativeStackScreenProps<RootStackParamList, 'ShopHome'>;

type ShopSegmentKey = 'topBrands' | 'nearbyStores' | 'marketplace';

const SEGMENTS: Segment[] = [
  { key: 'topBrands', label: 'Top Brands' },
  { key: 'nearbyStores', label: 'Nearby Stores' },
  { key: 'marketplace', label: '1Fi Marketplace' },
];

const SEARCH_PLACEHOLDERS: Record<ShopSegmentKey, string> = {
  topBrands: 'Search online stores...',
  nearbyStores: 'Search stores...',
  marketplace: 'Search products...',
};

const TAB_TITLES: Record<Exclude<TabKey, 'Shop'>, string> = {
  Home: 'Home',
  EMIDues: 'EMI Dues',
  Limit: 'Limit',
  Profile: 'Profile',
};

/**
 * Top Brands and Nearby Stores are the two segments that already exist in
 * the real app (left blank here, per the assignment). 1Fi Marketplace is
 * the new third segment this assignment adds, sharing the same hero banner
 * / segmented switcher / search bar shell as the other two.
 */
export function ShopHomeScreen({ navigation }: Props) {
  const [activeSegment, setActiveSegment] = useState<ShopSegmentKey>('topBrands');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSegment = (key: string) => {
    setActiveSegment(key as ShopSegmentKey);
    setSearchQuery('');
  };

  const handleNavigateTab = (key: TabKey) => {
    if (key === 'Shop') return;
    navigation.navigate('Placeholder', { title: TAB_TITLES[key], tabKey: key });
  };

  const topSection = (
    <ShopTopSection
      segments={SEGMENTS}
      activeSegment={activeSegment}
      onChangeSegment={handleChangeSegment}
      searchQuery={searchQuery}
      onChangeSearch={setSearchQuery}
      searchPlaceholder={SEARCH_PLACEHOLDERS[activeSegment]}
    />
  );

  return (
    <ScreenContainer>
      {activeSegment === 'marketplace' ? (
        <MarketplaceSection
          header={topSection}
          searchQuery={searchQuery}
          onSelectProduct={(productId) => navigation.navigate('ProductDetail', { productId })}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.blankContent}>
          {topSection}
          <EmptyState
            message={
              activeSegment === 'topBrands'
                ? 'Top Brands offers are coming soon.'
                : 'Nearby store listings are coming soon.'
            }
          />
        </ScrollView>
      )}

      <BottomTabBar activeKey="Shop" onNavigate={handleNavigateTab} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  blankContent: {
    paddingBottom: 140,
  },
});
