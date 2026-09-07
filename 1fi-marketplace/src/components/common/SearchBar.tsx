import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{'\uD83D\uDD0D'}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  icon: {
    fontSize: 14,
    marginRight: spacing.sm,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
  },
});
