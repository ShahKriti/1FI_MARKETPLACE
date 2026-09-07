import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../theme';

interface Props {
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
  tone?: 'light' | 'dark';
}

// Small floating circular button — used for the back affordance on
// image-led detail screens, matching the rounded, shadowed button language
// seen throughout the real app (e.g. the purple lock/eligibility CTAs).
export function CircularIconButton({ icon, onPress, style, tone = 'light' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={10}
      activeOpacity={0.8}
      style={[styles.base, tone === 'dark' && styles.dark, style]}
    >
      <Text style={[styles.icon, tone === 'dark' && styles.iconDark]}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  dark: {
    backgroundColor: 'rgba(23,17,35,0.35)',
  },
  icon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  iconDark: {
    color: colors.white,
  },
});
