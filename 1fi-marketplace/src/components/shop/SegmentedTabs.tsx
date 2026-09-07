import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export interface Segment {
  key: string;
  label: string;
}

interface Props {
  segments: Segment[];
  activeKey: string;
  onChange: (key: string) => void;
}

/**
 * The pill switcher above the Shop content — "Top Brands" / "Nearby Stores"
 * in the real app. Extended to a 3rd segment, "1Fi Marketplace", which is
 * the new section this assignment adds.
 */
export function SegmentedTabs({ segments, activeKey, onChange }: Props) {
  return (
    <View style={styles.track}>
      {segments.map((segment) => {
        const isActive = segment.key === activeKey;
        return (
          <TouchableOpacity
            key={segment.key}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onChange(segment.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {segment.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.pill,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  label: {
    ...typography.captionMedium,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
  },
});
