import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  message?: string;
  compact?: boolean;
}

export function LoadingState({ message = 'Loading...', compact }: Props) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <ActivityIndicator color={colors.primary} size="small" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  compact: {
    paddingVertical: spacing.lg,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
