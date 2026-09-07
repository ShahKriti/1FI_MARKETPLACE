import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  message: string;
}

export function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{'\uD83D\uDECD\uFE0F'}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
