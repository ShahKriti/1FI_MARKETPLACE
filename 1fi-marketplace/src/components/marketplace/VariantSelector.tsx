import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductVariant } from '../../data/types';
import { colors, radius, spacing, typography } from '../../theme';

interface Props {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isDisabled = !variant.inStock;
          return (
            <TouchableOpacity
              key={variant.id}
              disabled={isDisabled}
              onPress={() => onSelect(variant.id)}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                isDisabled && styles.chipDisabled,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                  isDisabled && styles.chipTextDisabled,
                ]}
              >
                {variant.label}
                {isDisabled ? ' \u00B7 Out of stock' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: spacing.sm,
  },
  row: {
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    ...typography.captionMedium,
    color: colors.textPrimary,
  },
  chipTextSelected: {
    color: colors.primary,
  },
  chipTextDisabled: {
    color: colors.textMuted,
  },
});
