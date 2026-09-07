import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Button } from './Button';

interface Props {
  message: string;
  onRetry: () => void;
  compact?: boolean;
}

export function ErrorState({ message, onRetry, compact }: Props) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Text style={styles.icon}>{'\u26A0\uFE0F'}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button label="Retry" onPress={onRetry} variant="secondary" style={styles.retryButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: {
    paddingVertical: spacing.lg,
  },
  icon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    minWidth: 120,
    height: 40,
  },
});
