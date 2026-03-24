import React from 'react';
import { Pressable, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/theme';

type InterestChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function InterestChip({ label, selected, onPress }: InterestChipProps) {
  return (
    <Pressable
      className={`flex-row items-center gap-sm rounded-pill px-lg py-sm ${
        selected ? 'bg-primary' : 'bg-surface-high'
      }`}
      onPress={onPress}>
      <Text className={`text-[16px] font-semibold leading-[24px] ${selected ? 'text-white' : 'text-text'}`}>
        {label}
      </Text>
      <IconSymbol
        name={selected ? 'xmark' : 'plus'}
        size={14}
        color={selected ? '#FFFFFF' : colors.secondaryText}
      />
    </Pressable>
  );
}