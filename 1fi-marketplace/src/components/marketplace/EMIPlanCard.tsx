import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ComputedEMIPlan } from '../../data/types';
import { colors, radius, spacing, typography } from '../../theme';
import { formatINR } from '../../utils/currency';

interface Props {
  plan: ComputedEMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export function EMIPlanCard({ plan, isSelected, onSelect }: Props) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.75}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <View style={styles.radioOuter}>{isSelected ? <View style={styles.radioInner} /> : null}</View>

      <View style={styles.details}>
        <View style={styles.topRow}>
          <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
          {plan.isNoCostEmi ? (
            <View style={styles.noCostBadge}>
              <Text style={styles.noCostBadgeText}>No Cost EMI</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.monthlyAmount}>{formatINR(plan.monthlyAmount)} / month</Text>
        <Text style={styles.meta}>
          {plan.bankName}
          {plan.isNoCostEmi ? '' : ` \u00B7 ${plan.interestRatePercent}% p.a.`}
          {plan.processingFee > 0 ? ` \u00B7 ${formatINR(plan.processingFee)} processing fee` : ''}
        </Text>
        <Text style={styles.total}>Total payable: {formatINR(plan.totalPayable)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: colors.primaryMuted,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  details: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tenure: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  noCostBadge: {
    backgroundColor: colors.badgeBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  noCostBadgeText: {
    ...typography.captionMedium,
    color: colors.badgeText,
  },
  monthlyAmount: {
    ...typography.price,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  total: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
