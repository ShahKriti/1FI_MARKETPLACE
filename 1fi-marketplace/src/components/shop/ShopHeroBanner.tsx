import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * Matches the purple gradient "Shop today, Pay later using Mutual funds"
 * banner at the top of the real Shop screen. The illustration in the real
 * app (phone/laptop/car/bike bursting out of a shopping bag) is a custom
 * asset I don't have — stood in here with an emoji cluster so the layout,
 * copy, and gradient are faithful even though the artwork itself isn't.
 */
export function ShopHeroBanner() {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.textCol}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{'\u2728'} NO-COST EMIs</Text>
        </View>
        <Text style={styles.headline}>
          Shop today,{'\n'}
          <Text style={styles.headlineItalic}>Pay later using</Text>
          {'\n'}Mutual funds.
        </Text>
        <Text style={styles.subtext}>
          No credit score required. No interest.{'\n'}Backed by your investments.
        </Text>
      </View>
      <View style={styles.illustrationWrap}>
        <Text style={styles.illustration}>{'\uD83D\uDCF1\uD83D\uDCBB\uD83D\uDECD\uFE0F'}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    overflow: 'hidden',
  },
  textCol: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginBottom: spacing.md,
  },
  badgeText: {
    ...typography.captionMedium,
    color: colors.textOnDark,
    letterSpacing: 0.5,
  },
  headline: {
    ...typography.h1,
    color: colors.textOnDark,
    marginBottom: spacing.sm,
  },
  headlineItalic: {
    fontStyle: 'italic',
  },
  subtext: {
    ...typography.caption,
    color: colors.textOnDarkMuted,
  },
  illustrationWrap: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    fontSize: 30,
    lineHeight: 38,
  },
});
