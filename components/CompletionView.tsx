import React from 'react';
import { Pressable, Text, View } from 'react-native';

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
    <View className="flex-1 items-center justify-center gap-xl px-xl">
      <View
        className="h-[120px] w-[120px] items-center justify-center rounded-full bg-primary"
        style={{
          shadowColor: '#4E6073',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.22,
          shadowRadius: 24,
          elevation: 6,
        }}>
        <Text className="text-[56px] font-bold leading-[56px] text-white">✓</Text>
      </View>

      <Text className="text-center text-[28px] font-extrabold leading-[34px] text-text">
        You&apos;re informed for today.
      </Text>
      <Text className="text-center text-[16px] leading-[24px] text-secondary-text">
        Take a breath. You caught up on the essentials.
      </Text>

      <View className="w-full flex-row gap-md">
        <View className="flex-1 items-center rounded-lg bg-surface-low px-lg py-xl">
          <Text className="text-[48px] font-extrabold leading-[52px] text-secondary">{readCount}</Text>
          <Text className="text-[16px] leading-[24px] text-secondary-text">stories read today</Text>
        </View>
        <View className="flex-1 items-center rounded-lg bg-surface-low px-lg py-xl">
          <Text className="text-[48px] font-extrabold leading-[52px] text-secondary">{currentStreak}</Text>
          <Text className="text-[16px] leading-[24px] text-secondary-text">day streak</Text>
        </View>
      </View>

      <Pressable className="w-full items-center rounded-pill bg-primary py-lg" onPress={onRestart}>
        <Text className="text-[16px] font-semibold leading-[24px] text-white">Review again</Text>
      </Pressable>
      <Pressable className="w-full items-center rounded-pill bg-surface-high py-lg" onPress={onBackToToday}>
        <Text className="text-[16px] font-semibold leading-[24px] text-text">Back to Today</Text>
      </Pressable>
    </View>
  );
}
