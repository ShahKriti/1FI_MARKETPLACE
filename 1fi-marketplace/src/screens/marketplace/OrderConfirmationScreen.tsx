import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { Button } from '../../components/common/Button';
import { colors, radius, spacing, typography } from '../../theme';
import { formatINR } from '../../utils/currency';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

/**
 * Final review + CTA step, matching the assignment's "CTA to proceed with the
 * selected plan" requirement. Confirmation is mocked (no real checkout/order
 * backend exists), but it's wired the same way a real submit call would be —
 * a single async-looking action with a loading state on the button.
 */
export function OrderConfirmationScreen({ navigation, route }: Props) {
  const {
    productName,
    productThumbnail,
    variantLabel,
    variantPrice,
    tenureMonths,
    monthlyAmount,
    totalPayable,
    isNoCostEmi,
    bankName,
  } = route.params;

  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Order placed', 'Your EMI plan has been confirmed.', [
        { text: 'Back to Marketplace', onPress: () => navigation.popToTop() },
      ]);
    }, 900);
  };

  return (
    <ScreenContainer>
      <AppHeader title="Review & Confirm" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.productRow}>
          <Image source={{ uri: productThumbnail }} style={styles.thumbnail} resizeMode="cover" />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.variant}>{variantLabel}</Text>
            <Text style={styles.variantPrice}>{formatINR(variantPrice)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selected EMI plan</Text>
          <Row label="Tenure" value={`${tenureMonths} months`} />
          <Row label="Monthly amount" value={`${formatINR(monthlyAmount)} / month`} />
          <Row label="Plan type" value={isNoCostEmi ? 'No Cost EMI' : `${bankName} EMI`} />
          <Row label="Total payable" value={formatINR(totalPayable)} emphasize />
        </View>

        <Text style={styles.disclaimer}>
          By proceeding, you agree to the EMI terms shown above. This is a demo checkout flow —
          no real payment is processed.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Confirm & Proceed" onPress={handleConfirm} loading={submitting} />
      </View>
    </ScreenContainer>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, emphasize && styles.rowValueEmphasis]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  variant: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  variantPrice: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  rowValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  rowValueEmphasis: {
    ...typography.price,
    color: colors.primary,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
