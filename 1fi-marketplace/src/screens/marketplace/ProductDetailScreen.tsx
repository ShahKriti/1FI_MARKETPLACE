import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { CircularIconButton } from '../../components/common/CircularIconButton';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { SectionHeader } from '../../components/common/SectionHeader';
import { VariantSelector } from '../../components/marketplace/VariantSelector';
import { EMIPlanCard } from '../../components/marketplace/EMIPlanCard';
import { PriceSummaryBar } from '../../components/marketplace/PriceSummaryBar';
import { useProductDetail } from '../../hooks/useProductDetail';
import { useEmiPlans } from '../../hooks/useEmiPlans';
import { colors, spacing, typography } from '../../theme';
import { formatINR, discountPercent } from '../../utils/currency';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { width } = useWindowDimensions();

  const { data: product, loading, error, refetch } = useProductDetail(productId);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Default to the first in-stock variant once the product loads.
  useEffect(() => {
    if (product && !selectedVariantId) {
      const firstAvailable = product.variants.find((v) => v.inStock) ?? product.variants[0];
      setSelectedVariantId(firstAvailable?.id ?? null);
    }
  }, [product, selectedVariantId]);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  const {
    data: emiPlans,
    loading: emiLoading,
    error: emiError,
    refetch: refetchEmi,
  } = useEmiPlans(productId, selectedVariant?.price ?? 0, product?.emiPlanTemplates ?? []);

  // A plan chosen for one variant's price shouldn't silently carry over to a
  // different variant's price, so force an explicit re-selection.
  useEffect(() => {
    setSelectedPlanId(null);
  }, [selectedVariantId]);

  const selectedPlan = useMemo(
    () => emiPlans?.find((p) => p.id === selectedPlanId) ?? null,
    [emiPlans, selectedPlanId]
  );

  if (loading && !product) {
    return (
      <ScreenContainer>
        <View style={styles.floatingBack}>
          <CircularIconButton icon="\u2190" onPress={() => navigation.goBack()} />
        </View>
        <LoadingState message="Loading product..." />
      </ScreenContainer>
    );
  }

  if (error || !product) {
    return (
      <ScreenContainer>
        <View style={styles.floatingBack}>
          <CircularIconButton icon="\u2190" onPress={() => navigation.goBack()} />
        </View>
        <ErrorState message={error ?? 'Product not found.'} onRetry={refetch} />
      </ScreenContainer>
    );
  }

  const discount = selectedVariant ? discountPercent(selectedVariant.price, selectedVariant.mrp) : null;

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {product.images.map((uri) => (
              <Image key={uri} source={{ uri }} style={{ width, height: width }} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.floatingBackOverImage}>
            <CircularIconButton icon="\u2190" onPress={() => navigation.goBack()} />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.rating}>
            {'\u2605'} {product.rating.toFixed(1)} ({product.ratingCount.toLocaleString('en-IN')} ratings)
          </Text>

          {selectedVariant ? (
            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatINR(selectedVariant.price)}</Text>
              {selectedVariant.mrp ? (
                <Text style={styles.mrp}>{formatINR(selectedVariant.mrp)}</Text>
              ) : null}
              {discount ? <Text style={styles.discount}>{discount}% off</Text> : null}
            </View>
          ) : null}

          <View style={styles.section}>
            <SectionHeader title="Select variant" />
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId ?? ''}
              onSelect={setSelectedVariantId}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Highlights" />
            {product.highlights.map((point) => (
              <Text key={point} style={styles.highlight}>
                {'\u2022'} {point}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader title="About this product" />
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="EMI options"
              subtitle={selectedVariant ? `For ${formatINR(selectedVariant.price)}` : undefined}
            />
            {emiLoading && !emiPlans ? (
              <LoadingState message="Fetching EMI plans..." compact />
            ) : emiError ? (
              <ErrorState message={emiError} onRetry={refetchEmi} compact />
            ) : emiPlans && emiPlans.length > 0 ? (
              emiPlans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={plan.id === selectedPlanId}
                  onSelect={() => setSelectedPlanId(plan.id)}
                />
              ))
            ) : (
              <Text style={styles.description}>No EMI plans available for this variant.</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <PriceSummaryBar
        monthlyAmount={selectedPlan?.monthlyAmount ?? null}
        tenureMonths={selectedPlan?.tenureMonths ?? null}
        disabled={!selectedVariant || !selectedPlan}
        onProceed={() => {
          if (!selectedVariant || !selectedPlan) return;
          navigation.navigate('OrderConfirmation', {
            productName: product.name,
            productThumbnail: product.thumbnail,
            variantLabel: selectedVariant.label,
            variantPrice: selectedVariant.price,
            tenureMonths: selectedPlan.tenureMonths,
            monthlyAmount: selectedPlan.monthlyAmount,
            totalPayable: selectedPlan.totalPayable,
            isNoCostEmi: selectedPlan.isNoCostEmi,
            bankName: selectedPlan.bankName,
          });
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  floatingBack: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
  },
  floatingBackOverImage: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  body: {
    padding: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
  },
  brand: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 2,
  },
  rating: {
    ...typography.caption,
    color: colors.warning,
    marginTop: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  price: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  mrp: {
    ...typography.priceStrike,
    color: colors.textMuted,
  },
  discount: {
    ...typography.captionMedium,
    color: colors.success,
  },
  highlight: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
