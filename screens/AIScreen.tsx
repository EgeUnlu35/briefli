import React, { useMemo, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { ChatMessage, ChatMessageModel } from '@/components/ChatMessage';
import { colors, radii, spacing, typography } from '@/theme';

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <AppHeader title="Briefli" />

        <View style={styles.header}>
          <Text style={styles.title}>Ask about the news</Text>
          <Text style={styles.subtitle}>Quick answers, no doom scroll.</Text>
        </View>

        <FlatList
          style={styles.messages}
          contentContainerStyle={styles.messageContent}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask Briefli AI"
            placeholderTextColor={colors.secondaryText}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    ...typography.title,
  },
  subtitle: {
    color: colors.secondaryText,
    ...typography.body,
  },
  messages: {
    flex: 1,
  },
  messageContent: {
    paddingVertical: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    color: colors.text,
    ...typography.body,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sendText: {
    color: '#FFFFFF',
    ...typography.bodyStrong,
  },
});
