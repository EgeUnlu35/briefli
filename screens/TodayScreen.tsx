import React, { useMemo, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { CompletionView } from '@/components/CompletionView';
import { ProgressHeader } from '@/components/ProgressHeader';
import { StoryCard } from '@/components/StoryCard';
import { mockNews, Story } from '@/data/mockNews';
import { colors, radii, spacing, typography } from '@/theme';

export function TodayScreen() {
  const swiperRef = useRef<Swiper<Story> | null>(null);
  const { width: screenWidth } = useWindowDimensions();
  const [currentStreak, setCurrentStreak] = useState(12);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [streakAwardedForToday, setStreakAwardedForToday] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<number, 'read' | 'skip'>>({});

  const totalCount = mockNews.length;
  const deckWidth = Math.min(380, Math.max(280, screenWidth - spacing.xl * 2));
  const deckViewportHeight = 540;
  const deckCardHeight = 430;
  const deckCardTop = Math.max((deckViewportHeight - deckCardHeight) / 2, 0);
  const cardHorizontalMargin = Math.max((screenWidth - deckWidth) / 2, 0);
  const handledCount = currentIndex;
  const isComplete = handledCount >= totalCount;
  const readCount = useMemo(
    () => Object.values(decisions).filter((decision) => decision === 'read').length,
    [decisions]
  );
  const skippedCount = useMemo(
    () => Object.values(decisions).filter((decision) => decision === 'skip').length,
    [decisions]
  );

  const handleRestart = () => {
    setSessionStarted(true);
    setCurrentIndex(0);
    setDecisions({});
    swiperRef.current?.jumpToCardIndex(0);
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

    const swiper = swiperRef.current;
    if (!swiper) {
      return;
    }

    const previousCardIndex = currentIndex - 1;
    swiper.jumpToCardIndex(previousCardIndex);
    setCurrentIndex(previousCardIndex);
    setDecisions((current) => {
      const next = { ...current };
      delete next[previousCardIndex];
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex >= totalCount) {
      return;
    }

    swiperRef.current?.swipeRight();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

            <View style={[styles.swiperContainer, { height: deckViewportHeight }]}>
              <Swiper
                ref={swiperRef}
                cards={mockNews}
                containerStyle={styles.swiperInnerContainer}
                cardStyle={[styles.swiperCard, { height: deckCardHeight }]}
                renderCard={(story) =>
                  story ? (
                    <StoryCard story={story} />
                  ) : (
                    <View style={styles.emptyCard}>
                      <Text style={styles.emptyText}>No stories available.</Text>
                    </View>
                  )
                }
                cardVerticalMargin={deckCardTop}
                cardHorizontalMargin={cardHorizontalMargin}
                showSecondCard
                stackSize={3}
                stackScale={8}
                stackSeparation={18}
                secondCardZoom={0.94}
                backgroundColor="transparent"
                useViewOverflow
                verticalSwipe={false}
                disableTopSwipe
                disableBottomSwipe
                animateCardOpacity
                onSwiped={(index) => setCurrentIndex(Math.min(index + 1, totalCount))}
                onSwipedLeft={(index) =>
                  setDecisions((current) => ({
                    ...current,
                    [index]: 'skip',
                  }))
                }
                onSwipedRight={(index) =>
                  setDecisions((current) => ({
                    ...current,
                    [index]: 'read',
                  }))
                }
                onSwipedAll={() => {
                  setCurrentIndex(totalCount);
                  setHasCompletedToday(true);
                  if (!streakAwardedForToday) {
                    setCurrentStreak((current) => current + 1);
                    setStreakAwardedForToday(true);
                  }
                }}
              />
            </View>

            <View style={styles.footerControls}>
              <Pressable style={styles.secondaryButton} onPress={handlePrevious}>
                <Text style={styles.secondaryButtonText}>&lt; Previous</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleNext}>
                <Text style={styles.primaryButtonText}>Next &gt;</Text>
              </Pressable>
            </View>

            <Text style={styles.counterNote}>Read: {readCount}  Skipped: {skippedCount}</Text>
          </>
        )}
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
    gap: spacing.md,
  },
  swiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    width: '100%',
    marginHorizontal: -spacing.xl,
    overflow: 'visible',
  },
  swiperInnerContainer: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  swiperCard: {
    marginLeft: 0,
    marginRight: 0,
    overflow: 'visible',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.sm,
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
  counterNote: {
    color: colors.tertiaryText,
    textAlign: 'center',
    ...typography.caption,
  },
});
