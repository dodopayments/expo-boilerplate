/**
 * PaymentButton component
 * Reusable button for initiating checkout
 */

import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface PaymentButtonProps {
  onPress: () => void;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function PaymentButton({
  onPress,
  title = 'Buy Now',
  loading = false,
  disabled = false,
  variant = 'primary',
  fullWidth = true,
}: PaymentButtonProps) {
  const primaryColor = useThemeColor(
    { light: '#007AFF', dark: '#0A84FF' },
    'tint'
  );
  const secondaryColor = useThemeColor(
    { light: '#EBEBEB', dark: '#3A3A3C' },
    'background'
  );
  const textColor = variant === 'primary' ? '#FFFFFF' : useThemeColor({}, 'text');

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: variant === 'primary' ? primaryColor : secondaryColor,
          opacity: pressed ? 0.8 : isDisabled ? 0.5 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <ThemedText
          style={[
            styles.buttonText,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

