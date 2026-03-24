import React from 'react';
import { Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View className="min-w-[100px] flex-1 gap-sm rounded-lg border border-border bg-card p-lg">
      <Text className="text-[13px] font-medium leading-[18px] text-secondary-text">{label}</Text>
      <Text className="text-[16px] font-semibold leading-[24px] text-text">{value}</Text>
    </View>
  );
}
