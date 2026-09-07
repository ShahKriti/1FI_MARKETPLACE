import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export type TabKey = 'Home' | 'Shop' | 'EMIDues' | 'Limit' | 'Profile';

const TABS: { key: TabKey; icon: string; label: string }[] = [
  { key: 'Home', icon: '\uD83C\uDFE0', label: 'Home' },
  { key: 'Shop', icon: '\uD83C\uDFEA', label: 'Shop' },
  { key: 'EMIDues', icon: '\uD83E\uDDFE', label: 'EMI Dues' },
  { key: 'Limit', icon: '\uD83D\uDCC8', label: 'Limit' },
  { key: 'Profile', icon: '\uD83D\uDC64', label: 'Profile' },
];

interface Props {
  activeKey: TabKey;
  onNavigate: (key: TabKey) => void;
}

/**
 * Floating 5-tab bar (Home / Shop / EMI Dues / Limit / Profile) present on
 * every screen in the real app. Only "Shop" is in scope for this assignment
 * — the other four route to a lightweight placeholder so the bar is never a
 * dead end, matching how Top Brands / Nearby Stores are handled.
 */
export function BottomTabBar({ activeKey, onNavigate }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onNavigate(tab.key)}
              activeOpacity={0.7}
            >
              {isActive ? <View style={styles.activeIndicator} /> : <View style={styles.indicatorSpacer} />}
              <Text style={styles.icon}>{tab.icon}</Text>
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeIndicator: {
    width: 18,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    marginBottom: 4,
  },
  indicatorSpacer: {
    height: 3,
    marginBottom: 4,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
