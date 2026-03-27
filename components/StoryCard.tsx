import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Story } from '@/data/mockNews';
import { colors, radii, spacing, typography } from '@/theme';

type StoryCardProps = {
  story: Story;
};

const BLURHASH_PLACEHOLDER =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7telecom';

export function StoryCard({ story }: StoryCardProps) {
  return (
    <View style={styles.card}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled>
        <View style={styles.heroWrap}>
          <Image
            source={story.imageUrl}
            style={styles.image}
            contentFit="cover"
            placeholder={BLURHASH_PLACEHOLDER}
            transition={200}
            cachePolicy="memory-disk"
            recyclingKey={story.id}
          />
          <View style={styles.heroScrim} />
          <View style={styles.categoryPillTopLeft}>
            <Text style={styles.categoryTopLeft}>{story.category}</Text>
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.title}>{story.title}</Text>
          </View>
        </View>

        <View style={styles.bodySection}>
          <Text style={styles.summary}>{story.summary}</Text>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Why it matters</Text>
            <Text style={styles.detailText} numberOfLines={6}>{story.whyItMatters}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Context</Text>
            <Text style={styles.detailText} numberOfLines={6}>{story.context}</Text>
          </View>

          {story.source ? <Text style={styles.sourceText}>Source: {story.source}</Text> : null}
        </View>
      </ScrollView>
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
    overflow: 'hidden',
    shadowColor: '#2A3435',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 28,
    elevation: 4,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  heroWrap: {
    width: '100%',
    height: 300,
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
    top: '55%',
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
});
