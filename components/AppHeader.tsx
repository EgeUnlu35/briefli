import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/theme';

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
    <View className="rounded-pill border border-[rgba(114,125,126,0.16)] bg-[rgba(248,250,250,0.74)] px-sm py-sm">
      <View className="flex-row items-center justify-between gap-sm">
        <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-surface-low" onPress={onPressLeft}>
          <IconSymbol name={leftIconName} size={20} color={colors.secondaryText} />
        </Pressable>

        <Text className="flex-1 text-center text-[24px] font-bold leading-[30px] tracking-[-0.4px] text-text">
          {title}
        </Text>

        <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container">
          <Text className="text-[14px] font-bold leading-[18px] text-primary-dim">{rightInitial}</Text>
        </View>
      </View>
    </View>
  );
}