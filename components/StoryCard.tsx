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
        <Animated.View style={[styles.heroWrap, { transform: [{ scale: imageScale }] }]}>
          <Image source={{ uri: story.imageUrl }} style={styles.image} resizeMode="cover" />
          <View style={styles.heroScrim} />
          <View style={styles.categoryPillTopLeft}>
            <Text style={styles.categoryTopLeft}>{story.category}</Text>
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.title}>{story.title}</Text>
          </View>
        </Animated.View>

        <View style={styles.bodySection}>
          <Text style={styles.summary} numberOfLines={expanded ? undefined : 3}>
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
              <Text style={styles.detailText} numberOfLines={expanded ? undefined : 4}>
                {story.whyItMatters}
              </Text>
            </View>

            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Context</Text>
              <Text style={styles.detailText} numberOfLines={expanded ? undefined : 4}>
                {story.context}
              </Text>
            </View>

            {story.source ? <Text style={styles.sourceText}>Source: {story.source}</Text> : null}
          </Animated.View>

          <Pressable
            style={styles.expandToggle}
            hitSlop={14}
            onPress={() => onToggleExpand(!expanded)}>
            <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
              <Text style={styles.expandArrow}>↓</Text>
            </Animated.View>
          </Pressable>
        </View>
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
    minHeight: 430,
    overflow: 'hidden',
    shadowColor: '#2A3435',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 28,
    elevation: 4,
  },
  contentContainer: {
    paddingBottom: spacing.sm,
  },
  heroWrap: {
    width: '100%',
    height: 330,
    backgroundColor: colors.surfaceContainerHigh,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainerHigh,
  },
  heroScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '60%',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  heroOverlay: {
    position: 'absolute',
    left: spacing.xxl,
    right: spacing.xxl,
    bottom: spacing.xl,
    gap: spacing.md,
  },
  categoryPillTopLeft: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.primaryContainer,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  categoryTopLeft: {
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  title: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    ...typography.headline,
  },
  bodySection: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  summary: {
    color: colors.text,
    ...typography.bodyStrong,
  },
  detailSection: {
    overflow: 'hidden',
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  detailBlock: {
    gap: spacing.xs,
  },
  detailLabel: {
    color: colors.primaryDim,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    ...typography.caption,
  },
  detailText: {
    color: colors.text,
    ...typography.body,
    lineHeight: 25,
  },
  sourceText: {
    color: colors.tertiaryText,
    marginTop: spacing.xs,
    ...typography.caption,
  },
  expandToggle: {
    alignSelf: 'center',
    width: 34,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  expandArrow: {
    color: colors.secondary,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
  },
});
