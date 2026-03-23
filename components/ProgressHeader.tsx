import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type ProgressHeaderProps = {
  completed: number;
  total: number;
};

export function ProgressHeader({ completed, total }: ProgressHeaderProps) {
  const progress = total > 0 ? completed / total : 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Daily briefing</Text>
        <Text style={styles.count}>
          {completed} / {total}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.max(progress, 0.03) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.secondaryText,
    letterSpacing: 1,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  count: {
    color: colors.primary,
    ...typography.bodyStrong,
  },
  track: {
    height: 6,
    width: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.secondary,
  },
});
