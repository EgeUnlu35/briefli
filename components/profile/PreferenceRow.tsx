import React from 'react';
import { Switch, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/theme';

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
    <View className="flex-row items-center justify-between gap-md rounded-lg bg-surface-low p-lg">
      <View className="flex-1 flex-row items-center gap-md">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-card">
          <IconSymbol name={iconName} size={20} color={colors.primary} />
        </View>
        <View className="flex-1 gap-xs">
          <Text className="text-[16px] font-semibold leading-[24px] text-text">{title}</Text>
          <Text className="text-[13px] font-medium leading-[18px] text-secondary-text">{subtitle}</Text>
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