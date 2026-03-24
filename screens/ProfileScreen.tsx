import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { InterestChip } from '@/components/profile/InterestChip';
import { PreferenceRow } from '@/components/profile/PreferenceRow';
import { IconSymbol } from '@/components/ui/icon-symbol';

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
    <SafeAreaView className="flex-1 bg-transparent">
      <LinearGradient
        colors={['#CFE0EA', '#EAF2F6', '#F8FAFA']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: -140, left: 0 }}
      />

      <View className="flex-1 gap-lg bg-transparent px-xl pb-xl pt-lg">
        <AppHeader title="Briefli" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, gap: 24 }}
          showsVerticalScrollIndicator={false}>
          <View className="items-center justify-center gap-md">
            <View className="relative">
              <LinearGradient
                colors={['#D1E4FB', '#C6E7FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 132,
                  height: 132,
                  borderRadius: 66,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text className="text-[46px] font-extrabold leading-[50px] text-primary-dim">J</Text>
              </LinearGradient>

              <Pressable className="absolute bottom-[2px] right-[2px] h-[34px] w-[34px] items-center justify-center rounded-full bg-primary">
                <IconSymbol name="pencil" size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            <View className="items-center gap-xs">
              <Text className="text-center text-[28px] font-extrabold leading-[34px] text-text">
                Julian Vance
              </Text>
              <Text className="text-center text-[16px] leading-[24px] text-secondary-text">
                Curating since October 2023
              </Text>
            </View>
          </View>

          <View className="gap-md rounded-lg bg-surface-low p-xl">
            <View className="flex-row items-center justify-between gap-md">
              <View className="flex-1 gap-xs">
                <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[1px] text-primary">
                  Current focus
                </Text>
                <Text className="text-[24px] font-bold leading-[30px] text-text">
                  {currentStreak} Day Reading Streak
                </Text>
                <Text className="text-[13px] font-medium leading-[18px] text-secondary-text">
                  Keep it up. You are in the top 5% of curators this week.
                </Text>
              </View>

              <View
                className="h-[62px] w-[62px] items-center justify-center rounded-full bg-primary"
                style={{
                  shadowColor: '#4E6073',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.2,
                  shadowRadius: 16,
                  elevation: 4,
                }}>
                <IconSymbol name="flame.fill" size={28} color="#FFFFFF" />
              </View>
            </View>

            <View className="h-[6px] overflow-hidden rounded-pill bg-card">
              <View
                className="h-full rounded-pill bg-secondary"
                style={{ width: `${streakProgress * 100}%` }}
              />
            </View>

            <View className="flex-row justify-between">
              <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[0.5px] text-tertiary-text">
                Start
              </Text>
              <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[0.5px] text-tertiary-text">
                Milestone: {nextMilestone} days
              </Text>
            </View>
          </View>

          <View className="gap-md">
            <View className="flex-row items-center justify-between">
              <Text className="text-[24px] font-bold leading-[30px] text-text">Interests</Text>
              <Pressable>
                <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[0.8px] text-primary">
                  Manage all
                </Text>
              </Pressable>
            </View>

            <View className="flex-row flex-wrap gap-sm">
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

          <View className="gap-md">
            <Text className="text-[24px] font-bold leading-[30px] text-text">Preferences</Text>

            <View className="gap-sm">
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

          <View className="items-center border-t border-[rgba(114,125,126,0.16)] pt-lg">
            <Pressable className="rounded-pill bg-[rgba(159,64,61,0.1)] px-xxxl py-md">
              <Text className="text-[16px] font-semibold leading-[24px] text-[#9F403D]">Sign Out</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
