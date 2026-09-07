import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { CircularIconButton } from './CircularIconButton';

interface Props {
  title: string;
  onBack?: () => void;
}

// Minimal, borderless header — matches the real app, where drill-down
// screens use a plain back affordance rather than a bordered app bar.
export function AppHeader({ title, onBack }: Props) {
  return (
    <View style={styles.container}>
      {onBack ? <CircularIconButton icon="\u2190" onPress={onBack} /> : <View style={styles.spacer} />}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  spacer: {
    width: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    ...typography.h3,
    color: colors.textPrimary,
  },
});
