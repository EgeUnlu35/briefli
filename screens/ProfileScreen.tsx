import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { InterestChip } from '@/components/profile/InterestChip';
import { PreferenceRow } from '@/components/profile/PreferenceRow';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors, radii, spacing, typography } from '@/theme';

export function ProfileScreen() {
  const [darkAppearance, setDarkAppearance] = useState(false);
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(true);
  const [focusedReading, setFocusedReading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Quantum Physics',
    'Slow Living',
    'Modern Art',
  ]);

  const allInterests = useMemo(
    () => [
      'Quantum Physics',
      'Slow Living',
      'Architecture',
      'Sustainable Tech',
      'Modern Art',
      'Philosophy',
    ],
    []
  );

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const currentStreak = 12;
  const nextMilestone = 15;
  const streakProgress = Math.min(currentStreak / nextMilestone, 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#CFE0EA', '#EAF2F6', '#F8FAFA']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={styles.backgroundGradient}
      />

      <View style={styles.container}>
        <AppHeader title="Briefli" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarWrap}>
              <LinearGradient
                colors={['#D1E4FB', '#C6E7FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarBackground}>
                <Text style={styles.avatarLetter}>J</Text>
              </LinearGradient>

              <Pressable style={styles.editButton}>
                <IconSymbol name="pencil" size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.profileTextWrap}>
              <Text style={styles.profileName}>Julian Vance</Text>
              <Text style={styles.profileMeta}>Curating since October 2023</Text>
            </View>
          </View>

          <View style={styles.streakSection}>
            <View style={styles.streakRow}>
              <View style={styles.streakTextWrap}>
                <Text style={styles.streakEyebrow}>Current focus</Text>
                <Text style={styles.streakTitle}>{currentStreak} Day Reading Streak</Text>
                <Text style={styles.streakSubtitle}>
                  Keep it up. You are in the top 5% of curators this week.
                </Text>
              </View>

              <View style={styles.flameBadge}>
                <IconSymbol name="flame.fill" size={28} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${streakProgress * 100}%` }]} />
            </View>

            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Start</Text>
              <Text style={styles.progressLabel}>Milestone: {nextMilestone} days</Text>
            </View>
          </View>

          <View style={styles.sectionWrap}>
            <View style={styles.sectionTopRow}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <Pressable>
                <Text style={styles.sectionAction}>Manage all</Text>
              </Pressable>
            </View>

            <View style={styles.chipWrap}>
              {allInterests.map((interest) => (
                <InterestChip
                  key={interest}
                  label={interest}
                  selected={selectedInterests.includes(interest)}
                  onPress={() => toggleInterest(interest)}
                />
              ))}
            </View>
          </View>

          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.preferenceList}>
              <PreferenceRow
                iconName="moon.stars.fill"
                title="Dark appearance"
                subtitle="Switch to a night-friendly theme"
                value={darkAppearance}
                onValueChange={setDarkAppearance}
              />

              <PreferenceRow
                iconName="bell.badge.fill"
                title="Daily brief reminder"
                subtitle="Get notified at 8:00 AM"
                value={dailyReminderEnabled}
                onValueChange={setDailyReminderEnabled}
              />

              <PreferenceRow
                iconName="book.fill"
                title="Focused reading"
                subtitle="Hide all non-essential UI elements"
                value={focusedReading}
                onValueChange={setFocusedReading}
              />
            </View>
          </View>

          <View style={styles.signOutWrap}>
            <Pressable style={styles.signOutButton}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
    gap: spacing.xxl,
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarBackground: {
    width: 132,
    height: 132,
    borderRadius: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: colors.primaryDim,
    fontSize: 46,
    lineHeight: 50,
    fontWeight: '800',
  },
  editButton: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  profileTextWrap: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  profileName: {
    color: colors.text,
    textAlign: 'center',
    ...typography.headline,
  },
  profileMeta: {
    color: colors.secondaryText,
    textAlign: 'center',
    ...typography.body,
  },
  streakSection: {
    borderRadius: radii.lg,
    padding: spacing.xl,
    backgroundColor: colors.surfaceContainerLow,
    gap: spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  streakTextWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  streakEyebrow: {
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  streakTitle: {
    color: colors.text,
    ...typography.title,
  },
  streakSubtitle: {
    color: colors.secondaryText,
    ...typography.caption,
  },
  flameBadge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  progressTrack: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.secondary,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: colors.tertiaryText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  sectionWrap: {
    gap: spacing.md,
  },
  sectionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    ...typography.title,
  },
  sectionAction: {
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    ...typography.caption,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  preferenceList: {
    gap: spacing.sm,
  },
  signOutWrap: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(114,125,126,0.16)',
    alignItems: 'center',
  },
  signOutButton: {
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
    backgroundColor: 'rgba(159,64,61,0.1)',
  },
  signOutText: {
    color: '#9F403D',
    ...typography.bodyStrong,
  },
});
