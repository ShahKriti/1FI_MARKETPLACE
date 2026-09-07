import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { ShopHeroBanner } from './ShopHeroBanner';
import { SegmentedTabs, Segment } from './SegmentedTabs';
import { SearchBar } from '../common/SearchBar';

interface Props {
  segments: Segment[];
  activeSegment: string;
  onChangeSegment: (key: string) => void;
  searchQuery: string;
  onChangeSearch: (text: string) => void;
  searchPlaceholder: string;
}

/**
 * The part of the Shop screen that's identical no matter which segment is
 * active: hero banner, the Top Brands / Nearby Stores / 1Fi Marketplace
 * switcher, and the search bar. Used as the header of whichever content
 * (blank state or product grid) sits below it.
 */
export function ShopTopSection({
  segments,
  activeSegment,
  onChangeSegment,
  searchQuery,
  onChangeSearch,
  searchPlaceholder,
}: Props) {
  return (
    <View>
      <ShopHeroBanner />
      <View style={styles.controls}>
        <SegmentedTabs segments={segments} activeKey={activeSegment} onChange={onChangeSegment} />
        <View style={styles.searchSpacing}>
          <SearchBar value={searchQuery} onChangeText={onChangeSearch} placeholder={searchPlaceholder} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  searchSpacing: {
    marginTop: spacing.md,
  },
});
