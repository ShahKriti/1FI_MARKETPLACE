import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductCard } from './ProductCard';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { EmptyState } from '../common/EmptyState';
import { useProducts } from '../../hooks/useProducts';
import { colors, spacing, typography } from '../../theme';

interface Props {
  header: React.ReactNode;
  searchQuery: string;
  onSelectProduct: (productId: string) => void;
}

/**
 * The 1Fi Marketplace content itself: a searchable product grid with
 * loading/error/empty handling. Rendered as a single FlatList (with the
 * shared hero/tabs/search passed in as `header`) so it's one scrollable
 * surface rather than a FlatList nested inside a ScrollView.
 */
export function MarketplaceSection({ header, searchQuery, onSelectProduct }: Props) {
  const { data: products, loading, error, refetch } = useProducts();

  const filtered = useMemo(() => {
    if (!products) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.column}
      ListHeaderComponent={
        <View>
          {header}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>1Fi Marketplace</Text>
            {products ? <Text style={styles.sectionCount}>{filtered.length} products</Text> : null}
          </View>
        </View>
      }
      renderItem={({ item }) => <ProductCard product={item} onPress={() => onSelectProduct(item.id)} />}
      ListEmptyComponent={
        loading && !products ? (
          <LoadingState message="Loading products..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <EmptyState
            message={searchQuery ? 'No products match your search.' : 'No products available right now.'}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.sm,
    paddingBottom: 120,
  },
  column: {
    paddingHorizontal: spacing.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionCount: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
