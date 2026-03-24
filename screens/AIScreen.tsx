import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { ChatMessage, ChatMessageModel } from '@/components/ChatMessage';
import { colors } from '@/theme';

const assistantReplies = [
  'The latest updates point to gradual economic stabilization and strong momentum in AI governance discussions.',
  'In short: this trend matters because it affects costs, policy decisions, and consumer behavior over the next quarter.',
  'If you want, I can break this down by region or compare how the story evolved this week versus last week.',
];

export function AIScreen() {
  const [messages, setMessages] = useState<ChatMessageModel[]>([
    {
      id: 'seed-assistant',
      role: 'assistant',
      text: 'Ask anything about today\'s stories. I\'ll keep it concise.',
    },
  ]);
  const [input, setInput] = useState('');
  const isInputEmpty = input.trim().length === 0;

  const nextAssistantReply = useMemo(() => {
    const userMessageCount = messages.filter((message) => message.role === 'user').length;
    return assistantReplies[userMessageCount % assistantReplies.length];
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessageModel = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const assistantMessage: ChatMessageModel = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: nextAssistantReply,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={['top']}>
      <LinearGradient
        colors={['#CFE0EA', '#EAF2F6', '#F8FAFA']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: -140, left: 0 }}
      />
      <KeyboardAvoidingView
        className="flex-1 gap-lg bg-transparent px-xl pb-xl pt-lg"
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <AppHeader title="Briefli" />

        <View className="gap-xs">
          <Text className="text-[24px] font-bold leading-[30px] text-text">Ask about the news</Text>
          <Text className="text-[16px] leading-[24px] text-secondary-text">
            Quick answers, no doom scroll.
          </Text>
        </View>

        <FlatList
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 18 }}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyboardShouldPersistTaps="handled"
        />

        <View className="flex-row items-end gap-sm rounded-pill border border-border bg-card p-sm">
          <TextInput
            className="max-h-[120px] min-h-12 flex-1 px-md py-sm text-[16px] leading-[24px] text-text"
            placeholder="Ask Briefli AI"
            placeholderTextColor={colors.secondaryText}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
          />
          <Pressable
            className={`rounded-pill px-lg py-md ${isInputEmpty ? 'bg-surface-high' : 'bg-primary'}`}
            onPress={handleSend}
            disabled={isInputEmpty}>
            <Text className={`text-[16px] font-semibold leading-[24px] ${isInputEmpty ? 'text-tertiary-text' : 'text-white'}`}>
              Send
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
