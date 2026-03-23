import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type CompletionViewProps = {
  readCount: number;
  totalCount: number;
  currentStreak: number;
  onRestart: () => void;
  onBackToToday: () => void;
};

export function CompletionView({
  readCount,
  totalCount,
  currentStreak,
  onRestart,
  onBackToToday,
}: CompletionViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>You&apos;re informed for today.</Text>
      <Text style={styles.subtitle}>Take a breath. You caught up on the essentials.</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{readCount}</Text>
          <Text style={styles.statLabel}>stories read today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>day streak</Text>
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={onRestart}>
        <Text style={styles.primaryButtonText}>Review again</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={onBackToToday}>
        <Text style={styles.secondaryButtonText}>Back to Today</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 6,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 56,
    lineHeight: 56,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    ...typography.headline,
  },
  subtitle: {
    color: colors.secondaryText,
    textAlign: 'center',
    ...typography.body,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    color: colors.secondary,
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.secondaryText,
    ...typography.body,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    ...typography.bodyStrong,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    ...typography.bodyStrong,
  },
});
