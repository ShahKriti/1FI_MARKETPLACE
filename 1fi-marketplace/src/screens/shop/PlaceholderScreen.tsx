import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { BottomTabBar, TabKey } from '../../components/shop/BottomTabBar';
import { colors, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Placeholder'>;

/**
 * Stand-in for the four bottom-tab destinations outside this assignment's
 * scope (Home, EMI Dues, Limit, Profile) — styled after the real Profile
 * screen's left-aligned heading (no back button, since these are tab roots,
 * not drill-down screens).
 */
export function PlaceholderScreen({ navigation, route }: Props) {
  const { title, tabKey } = route.params;

  const handleNavigateTab = (key: TabKey) => {
    if (key === tabKey) return;
    if (key === 'Shop') {
      navigation.navigate('ShopHome');
      return;
    }
    navigation.replace('Placeholder', { title: labelFor(key), tabKey: key });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>This section isn't part of the assignment scope.</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.comingSoon}>Coming soon</Text>
      </View>
      <BottomTabBar activeKey={tabKey} onNavigate={handleNavigateTab} />
    </ScreenContainer>
  );
}

function labelFor(key: TabKey): string {
  switch (key) {
    case 'Home':
      return 'Home';
    case 'EMIDues':
      return 'EMI Dues';
    case 'Limit':
      return 'Limit';
    case 'Profile':
      return 'Profile';
    default:
      return key;
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    ...typography.body,
    color: colors.textMuted,
  },
});
