import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors, radii, spacing, typography } from '@/theme';

type IconName = React.ComponentProps<typeof IconSymbol>['name'];

type AppHeaderProps = {
  title: string;
  leftIconName?: IconName;
  onPressLeft?: () => void;
  rightInitial?: string;
};

export function AppHeader({
  title,
  leftIconName = 'line.3.horizontal',
  onPressLeft,
  rightInitial = 'J',
}: AppHeaderProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.row}>
        <Pressable style={styles.iconButton} onPress={onPressLeft}>
          <IconSymbol name={leftIconName} size={20} color={colors.secondaryText} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{rightInitial}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: radii.pill,
    backgroundColor: 'rgba(248,250,250,0.74)',
    borderWidth: 1,
    borderColor: 'rgba(114,125,126,0.16)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    letterSpacing: -0.4,
    ...typography.title,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryContainer,
  },
  avatarText: {
    color: colors.primaryDim,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
});