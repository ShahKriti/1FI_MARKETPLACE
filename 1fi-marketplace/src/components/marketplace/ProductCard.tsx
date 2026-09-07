import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductSummary } from '../../data/types';
import { colors, radius, spacing, typography } from '../../theme';
import { formatINR } from '../../utils/currency';

interface Props {
  product: ProductSummary;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
      {product.hasNoCostEmi ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>No Cost EMI</Text>
        </View>
      ) : null}
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>From {formatINR(product.startingPrice)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    margin: spacing.xs,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: {
    ...typography.captionMedium,
    color: colors.primary,
  },
  info: {
    padding: spacing.md,
  },
  brand: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  name: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginTop: 2,
    minHeight: 36,
  },
  price: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
