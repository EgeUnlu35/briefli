import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, TAnimationStyle } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { CompletionView } from '@/components/CompletionView';
import { ProgressHeader } from '@/components/ProgressHeader';
import { StoryCard } from '@/components/StoryCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockNews } from '@/data/mockNews';
import { spacing } from '@/theme';

export function TodayScreen() {
  const carouselRef = useRef<ICarouselInstance | null>(null);
  const previousIndexRef = useRef(0);
  const pendingForwardDecisionRef = useRef<'read' | 'skip' | null>(null);
  const { width: screenWidth } = useWindowDimensions();
  const directionAnimVal = useSharedValue(0);
  const [currentStreak, setCurrentStreak] = useState(12);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [streakAwardedForToday, setStreakAwardedForToday] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<number, 'read' | 'skip'>>({});

  // Adjust this to control how many trailing cards are visible behind the active card.
  const visibleDeckDepth = 2;

  const totalCount = mockNews.length;
  const carouselViewportWidth = Math.max(0, screenWidth - spacing.xl * 2);
  const deckWidth = Math.min(420, Math.max(300, carouselViewportWidth - spacing.md));
  const carouselWindowSize = Math.max(3, visibleDeckDepth * 2 + 1);
  const handledCount = currentIndex;
  const isComplete = handledCount >= totalCount;
  const readCount = useMemo(
    () => Object.values(decisions).filter((decision) => decision === 'read').length,
    [decisions]
  );

  const finalizeBriefIfNeeded = () => {
    if (currentIndex !== totalCount - 1) {
      return false;
    }

    setDecisions((current) => ({
      ...current,
      [currentIndex]: 'read',
    }));
    setHasCompletedToday(true);
    setCurrentIndex(totalCount);
    if (!streakAwardedForToday) {
      setCurrentStreak((current) => current + 1);
      setStreakAwardedForToday(true);
    }

    return true;
  };

  const animationStyle: TAnimationStyle = useCallback(
    (value: number, index: number) => {
      'worklet';

      const translateY = interpolate(value, [0, 1], [0, -18], Extrapolation.CLAMP);
      const translateX =
        interpolate(value, [-1, 0], [deckWidth, 0], Extrapolation.CLAMP) * directionAnimVal.value;
      const rotateZ =
        interpolate(value, [-1, 0], [14, 0], Extrapolation.CLAMP) * directionAnimVal.value;
      const scale = interpolate(value, [0, 1, visibleDeckDepth], [1, 0.95, 0.91], Extrapolation.CLAMP);
      const opacity = interpolate(
        value,
        [-1, -0.8, 0, 1, visibleDeckDepth],
        [0, 0.88, 1, 0.84, 0],
        Extrapolation.CLAMP
      );
      const zIndex = -10 * index;

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          { scale },
        ],
        opacity,
        zIndex,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deckWidth, visibleDeckDepth]
  );

  const handleSnapToItem = (nextIndex: number) => {
    const previousIndex = previousIndexRef.current;

    if (nextIndex > previousIndex) {
      const decision = pendingForwardDecisionRef.current ?? 'read';
      setDecisions((current) => ({
        ...current,
        [previousIndex]: decision,
      }));
    } else if (nextIndex < previousIndex) {
      setDecisions((current) => {
        const next = { ...current };
        delete next[nextIndex];
        return next;
      });
    }

    pendingForwardDecisionRef.current = null;
    previousIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
  };

  const handleRestart = () => {
    setSessionStarted(true);
    setCurrentIndex(0);
    previousIndexRef.current = 0;
    pendingForwardDecisionRef.current = null;
    setDecisions({});
    carouselRef.current?.scrollTo({ index: 0, animated: false });
  };

  const handleBackToToday = () => {
    setSessionStarted(false);
  };

  const handleStart = () => {
    setSessionStarted(true);
  };

  const handlePrevious = () => {
    if (currentIndex <= 0) {
      return;
    }

    pendingForwardDecisionRef.current = null;
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    if (currentIndex >= totalCount) {
      return;
    }

    if (finalizeBriefIfNeeded()) {
      return;
    }

    pendingForwardDecisionRef.current = 'read';
    carouselRef.current?.next();
  };

  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={['top']}>
      <LinearGradient
        colors={['#CFE0EA', '#EAF2F6', '#F8FAFA']}
        locations={[0, 0.38, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: -140, left: 0 }}
      />
      <View className="flex-1 gap-lg bg-transparent px-xl pb-xl pt-sm">
        {!sessionStarted ? (
          <>
            <AppHeader title="Briefli" />

            <View className="flex-1 items-center justify-center gap-lg">
              <View className="rounded-pill border border-[rgba(255,255,255,0.9)] bg-[rgba(255,255,255,0.7)] px-xl py-sm">
                <Text className="text-[13px] font-medium uppercase leading-[18px] tracking-[0.8px] text-text">
                  {currentStreak} day streak
                </Text>
              </View>
              <Text className="text-center text-[34px] font-extrabold leading-[40px] text-text">
                {hasCompletedToday ? 'You are informed for today.' : 'Your Daily Brief is ready.'}
              </Text>
              <Text className="text-center text-[16px] leading-[24px] text-secondary-text">
                {hasCompletedToday
                  ? 'Nice work. Come back tomorrow for a new brief, or review today\'s cards.'
                  : `${totalCount} curated insights distilled from the noise, ready for your morning flow.`}
              </Text>
              <Pressable
                className="mt-md rounded-pill bg-primary px-xxxl py-lg"
                style={{
                  shadowColor: '#4E6073',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.24,
                  shadowRadius: 24,
                  elevation: 4,
                }}
                onPress={handleStart}>
                <Text className="text-[16px] font-semibold leading-[24px] text-white">
                  {hasCompletedToday ? 'Review Today\'s Brief' : 'Start Daily Brief'}
                </Text>
              </Pressable>
            </View>
          </>
        ) : isComplete ? (
          <>
            <AppHeader title="Briefli" leftIconName="xmark" onPressLeft={handleBackToToday} />

            <CompletionView
              readCount={readCount}
              totalCount={totalCount}
              currentStreak={currentStreak}
              onRestart={handleRestart}
              onBackToToday={handleBackToToday}
            />
          </>
        ) : (
          <>
            <View className="gap-xs z-10">
              <AppHeader title="Briefli" leftIconName="xmark" onPressLeft={handleBackToToday} />
              <ProgressHeader completed={handledCount} total={totalCount} />
            </View>

            <View className="relative w-full flex-1 items-center pt-xl">
              <View className="w-full flex-1 items-center justify-center overflow-visible">
                <Carousel
                  ref={carouselRef}
                  data={mockNews}
                  loop={false}
                  width={carouselViewportWidth}
                  height={600}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible',
                  }}
                  defaultIndex={0}
                  windowSize={carouselWindowSize}
                  fixedDirection="negative"
                  customAnimation={animationStyle}
                  onConfigurePanGesture={(g) => {
                    g.onChange((e) => {
                      'worklet';
                      directionAnimVal.value = Math.sign(e.translationX);
                    });
                  }}
                  onSnapToItem={handleSnapToItem}
                  renderItem={({ item }) => (
                    <Animated.View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: deckWidth,
                      }}>
                      <StoryCard story={item} />
                    </Animated.View>
                  )}
                />
              </View>

              <View className="absolute bottom-2 left-0 right-0 z-20 flex-row items-center justify-between px-sm">
                <Pressable
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: 'rgba(225, 234, 235, 0.7)',
                    borderWidth: 1,
                    borderColor: 'rgba(114, 125, 126, 0.18)',
                  }}
                  onPress={handlePrevious}>
                  <IconSymbol name="arrow.left" size={26} color="#566162" />
                </Pressable>
                <Pressable
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: 'rgba(78, 96, 115, 0.82)',
                  }}
                  onPress={handleNext}>
                  <IconSymbol name="arrow.right" size={26} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
