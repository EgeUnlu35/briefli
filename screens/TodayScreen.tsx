import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, TAnimationStyle } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { CompletionView } from '@/components/CompletionView';
import { ProgressHeader } from '@/components/ProgressHeader';
import { StoryCard } from '@/components/StoryCard';
import { mockNews } from '@/data/mockNews';
import { colors, radii, spacing, typography } from '@/theme';

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
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<number, 'read' | 'skip'>>({});

  const totalCount = mockNews.length;
  const deckWidth = Math.min(360, Math.max(260, screenWidth - spacing.xxxl * 2));
  const carouselViewportWidth = screenWidth;
  const activeStoryId = currentIndex < totalCount ? mockNews[currentIndex]?.id : null;
  const hasExpandedCurrentCard = Boolean(activeStoryId && expandedStoryId === activeStoryId);
  const deckViewportHeight = hasExpandedCurrentCard ? 700 : 580;
  const deckCardHeight = hasExpandedCurrentCard ? 620 : 500;
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

    setExpandedStoryId(null);
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
      const scale = interpolate(value, [0, 1], [1, 0.95], Extrapolation.CLAMP);
      const opacity = interpolate(value, [-1, -0.8, 0, 1], [0, 0.88, 1, 0.84], Extrapolation.EXTEND);
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
    [deckWidth, directionAnimVal]
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
    setExpandedStoryId(null);
    setCurrentIndex(nextIndex);
  };

  const handleRestart = () => {
    setSessionStarted(true);
    setCurrentIndex(0);
    setExpandedStoryId(null);
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

    setExpandedStoryId(null);
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

    setExpandedStoryId(null);
    pendingForwardDecisionRef.current = 'read';
    carouselRef.current?.next();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={['#CFE0EA', '#EAF2F6', '#F8FAFA']}
        locations={[0, 0.38, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={styles.backgroundGradient}
      />
      <View style={styles.container}>
        {!sessionStarted ? (
          <>
            <AppHeader title="Briefli" />

            <View style={styles.heroWrapper}>
              <View style={styles.streakPill}>
                <Text style={styles.streakText}>{currentStreak} day streak</Text>
              </View>
              <Text style={styles.heroTitle}>
                {hasCompletedToday ? 'You are informed for today.' : 'Your Daily Brief is ready.'}
              </Text>
              <Text style={styles.heroSubtitle}>
                {hasCompletedToday
                  ? 'Nice work. Come back tomorrow for a new brief, or review today\'s cards.'
                  : `${totalCount} curated insights distilled from the noise, ready for your morning flow.`}
              </Text>
              <Pressable style={styles.startButton} onPress={handleStart}>
                <Text style={styles.startButtonText}>
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
            <View style={styles.headerGroup}>
              <AppHeader title="Briefli" leftIconName="xmark" onPressLeft={handleBackToToday} />
              <ProgressHeader completed={handledCount} total={totalCount} />
            </View>

            <View style={styles.deckLayout}>
              <View style={[styles.swiperContainer, { height: deckViewportHeight }]}> 
                <Carousel
                  ref={carouselRef}
                  data={mockNews}
                  loop={false}
                  width={carouselViewportWidth}
                  height={deckCardHeight}
                  style={styles.carousel}
                  defaultIndex={0}
                  windowSize={5}
                  fixedDirection="positive"
                  customAnimation={animationStyle}
                  onConfigurePanGesture={(g) => {
                    g.onChange((e) => {
                      'worklet';
                      directionAnimVal.value = Math.sign(e.translationX);
                    });
                  }}
                  onSnapToItem={handleSnapToItem}
                  renderItem={({ item }) => (
                    <Animated.View style={[styles.carouselItemWrap, { width: deckWidth }]}> 
                      <StoryCard
                        story={item}
                        expanded={expandedStoryId === item.id}
                        onToggleExpand={(nextExpanded) =>
                          setExpandedStoryId(nextExpanded ? item.id : null)
                        }
                      />
                    </Animated.View>
                  )}
                />
              </View>

              <View style={styles.footerControls}>
                <Pressable style={styles.secondaryButton} onPress={handlePrevious}>
                  <Text style={styles.secondaryButtonText}>&lt; Previous</Text>
                </Pressable>
                <Pressable style={styles.primaryButton} onPress={handleNext}>
                  <Text style={styles.primaryButtonText}>
                    {currentIndex === totalCount - 1 ? 'Finish' : 'Next >'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -140,
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
  heroWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  streakPill: {
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  streakText: {
    color: colors.text,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    ...typography.caption,
  },
  heroTitle: {
    color: colors.text,
    textAlign: 'center',
    ...typography.display,
  },
  heroSubtitle: {
    color: colors.secondaryText,
    textAlign: 'center',
    ...typography.body,
  },
  startButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    ...typography.bodyStrong,
  },
  headerGroup: {
    gap: spacing.xs,
  },
  deckLayout: {
    flex: 1,
    width: '100%',
    position: 'relative',
    paddingBottom: 92,
    alignItems: 'center',
  },
  swiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -spacing.xs,
    overflow: 'visible',
  },
  carousel: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  carouselItemWrap: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 440,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.secondaryText,
    ...typography.body,
  },
  footerControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    zIndex: 20,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
  },
  secondaryButtonText: {
    color: colors.secondaryText,
    ...typography.bodyStrong,
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    ...typography.bodyStrong,
  },
});
