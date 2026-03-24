import React from 'react';
import { Text, View } from 'react-native';

export type ChatRole = 'user' | 'assistant';

export type ChatMessageModel = {
  id: string;
  role: ChatRole;
  text: string;
};

type ChatMessageProps = {
  message: ChatMessageModel;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-md w-full ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[84%] rounded-md px-lg py-md ${
          isUser
            ? 'rounded-tr-[4px] bg-primary'
            : 'rounded-tl-[4px] border border-border bg-card'
        }`}>
        <Text className={`text-[16px] leading-[24px] ${isUser ? 'text-white' : 'text-text'}`}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}
