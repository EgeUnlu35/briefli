import React from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type ProgressHeaderProps = {
  completed: number;
  total: number;
};

export function ProgressHeader({ completed, total }: ProgressHeaderProps) {
  const progress = total > 0 ? completed / total : 0;
  const fillPercent = Math.max(progress, 0.03) * 100;

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${fillPercent}%`, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    }),
  }));

  return (
    <View className="gap-sm">
      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[1px] text-secondary-text">
          Daily briefing
        </Text>
        <Text className="text-[16px] font-semibold leading-[24px] text-primary">
          {completed} / {total}
        </Text>
      </View>
      <View className="h-[6px] w-full overflow-hidden rounded-pill bg-surface-high">
        <Animated.View
          className="h-full rounded-pill bg-secondary"
          style={animatedStyle}
        />
      </View>
    </View>
  );
}
