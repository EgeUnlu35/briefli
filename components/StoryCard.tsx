import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Story } from '@/data/mockNews';
import { colors, radii, spacing, typography } from '@/theme';

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.categoryPill}>
        <Text style={styles.category}>{story.category}</Text>
      </View>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.summary}>{story.summary}</Text>
      <Text style={styles.readTime}>{story.readTime} read</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
    minHeight: 430,
    shadowColor: '#2A3435',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 28,
    elevation: 4,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryContainer,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  category: {
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  title: {
    color: colors.text,
    ...typography.headline,
  },
  summary: {
    color: colors.text,
    ...typography.body,
  },
  readTime: {
    marginTop: 'auto',
    color: colors.tertiaryText,
    ...typography.caption,
  },
});
