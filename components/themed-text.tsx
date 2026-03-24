import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const variantClassName =
    type === 'default'
      ? 'text-[16px] leading-[24px]'
      : type === 'title'
        ? 'text-[32px] font-bold leading-[32px]'
        : type === 'defaultSemiBold'
          ? 'text-[16px] font-semibold leading-[24px]'
          : type === 'subtitle'
            ? 'text-[20px] font-bold'
            : 'text-[16px] leading-[30px] text-[#0a7ea4]';
  const dynamicColorStyle = type === 'link' ? undefined : { color };

  return <Text className={variantClassName} style={[dynamicColorStyle, style]} {...rest} />;
}
