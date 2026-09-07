import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { formatINR } from '../../utils/currency';
import { Button } from '../common/Button';

interface Props {
  monthlyAmount: number | null;
  tenureMonths: number | null;
  onProceed: () => void;
  disabled: boolean;
}

export function PriceSummaryBar({ monthlyAmount, tenureMonths, onProceed, disabled }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        {monthlyAmount != null && tenureMonths != null ? (
          <>
            <Text style={styles.amount}>{formatINR(monthlyAmount)}/mo</Text>
            <Text style={styles.tenure}>for {tenureMonths} months</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>Select an EMI plan</Text>
        )}
      </View>
      <Button label="Proceed" onPress={onProceed} disabled={disabled} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  summary: {
    flex: 1,
  },
  amount: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  tenure: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  placeholder: {
    ...typography.body,
    color: colors.textMuted,
  },
  button: {
    minWidth: 130,
    height: 48,
  },
});
