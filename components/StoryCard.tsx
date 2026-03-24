import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Story } from '@/data/mockNews';
import { colors, radii, spacing, typography } from '@/theme';

type StoryCardProps = {
  story: Story;
  expanded: boolean;
  onToggleExpand: (nextExpanded: boolean) => void;
};

export function StoryCard({ story, expanded, onToggleExpand }: StoryCardProps) {
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: expanded ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [expanded, expandAnim]);

  const detailMaxHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  const detailOpacity = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const detailTranslateY = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 0],
  });

  const imageScale = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  const arrowRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.card}>
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={expanded}
        scrollEnabled={expanded}
        bounces={false}
        overScrollMode="never">
        <View style={styles.categoryPill}>
          <Text style={styles.category}>{story.category}</Text>
        </View>
        <Text style={styles.title}>{story.title}</Text>

        <Animated.View style={{ transform: [{ scale: imageScale }] }}>
          <Image source={{ uri: story.imageUrl }} style={styles.image} resizeMode="cover" />
        </Animated.View>

        <Text style={styles.summary} numberOfLines={expanded ? 3 : 2}>
          {story.summary}
        </Text>

        <Animated.View
          style={[
            styles.detailSection,
            {
              maxHeight: detailMaxHeight,
              opacity: detailOpacity,
              transform: [{ translateY: detailTranslateY }],
            },
          ]}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Why it matters</Text>
            <Text style={styles.detailText} numberOfLines={4}>
              {story.whyItMatters}
            </Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Context</Text>
            <Text style={styles.detailText} numberOfLines={4}>
              {story.context}
            </Text>
          </View>

          {story.source ? <Text style={styles.sourceText}>Source: {story.source}</Text> : null}
        </Animated.View>

        <Pressable style={styles.expandToggle} onPress={() => onToggleExpand(!expanded)}>
          <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
            <Text style={styles.expandArrow}>↓</Text>
          </Animated.View>
          <Text style={styles.expandText}>{expanded ? 'Show less' : 'Read more'}</Text>
        </Pressable>

        {expanded ? <Text style={styles.readTime}>{story.readTime} read</Text> : null}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
    minHeight: 430,
    shadowColor: '#2A3435',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 28,
    elevation: 4,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
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
  image: {
    width: '100%',
    height: 150,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainerHigh,
  },
  summary: {
    color: colors.text,
    ...typography.bodyStrong,
  },
  detailSection: {
    overflow: 'hidden',
    gap: spacing.sm,
  },
  detailBlock: {
    gap: spacing.xs,
  },
  detailLabel: {
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    ...typography.caption,
  },
  detailText: {
    color: colors.text,
    ...typography.body,
  },
  sourceText: {
    color: colors.tertiaryText,
    ...typography.caption,
  },
  expandToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
    gap: 2,
  },
  expandArrow: {
    color: colors.secondary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
  },
  expandText: {
    color: colors.secondary,
    ...typography.caption,
  },
  readTime: {
    marginTop: spacing.xs,
    color: colors.tertiaryText,
    textAlign: 'center',
    ...typography.caption,
  },
});
