import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tabRoutes } from '@/navigation/tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: 'transparent',
          paddingBottom: 108,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 14,
          height: 74,
          borderRadius: 30,
          backgroundColor: isDark ? 'rgba(15,23,42,0.92)' : 'rgba(248,250,250,0.92)',
          borderTopWidth: 1,
          borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(114,125,126,0.14)',
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: '#2A3435',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.07,
          shadowRadius: 24,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      {tabRoutes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? Colors[colorScheme ?? 'light'].tint : 'transparent',
                }}>
                <IconSymbol size={22} name={route.icon} color={color} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
