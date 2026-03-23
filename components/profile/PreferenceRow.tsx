import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors, radii, spacing, typography } from '@/theme';

type IconName = React.ComponentProps<typeof IconSymbol>['name'];

type PreferenceRowProps = {
  iconName: IconName;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
};

export function PreferenceRow({
  iconName,
  title,
  subtitle,
  value,
  onValueChange,
}: PreferenceRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.leftGroup}>
        <View style={styles.iconBubble}>
          <IconSymbol name={iconName} size={20} color={colors.primary} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor="#FFFFFF"
        trackColor={{ false: '#CBD5E1', true: colors.secondary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  textGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    ...typography.bodyStrong,
  },
  subtitle: {
    color: colors.secondaryText,
    ...typography.caption,
  },
});