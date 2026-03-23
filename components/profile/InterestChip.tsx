import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors, radii, spacing, typography } from '@/theme';

type InterestChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function InterestChip({ label, selected, onPress }: InterestChipProps) {
  return (
    <Pressable style={[styles.chip, selected ? styles.chipSelected : styles.chipIdle]} onPress={onPress}>
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelIdle]}>{label}</Text>
      <IconSymbol
        name={selected ? 'xmark' : 'plus'}
        size={14}
        color={selected ? '#FFFFFF' : colors.secondaryText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipIdle: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  label: {
    ...typography.bodyStrong,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
  labelIdle: {
    color: colors.text,
  },
});