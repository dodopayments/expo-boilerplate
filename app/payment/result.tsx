/**
 * Payment Result screen
 */

import { StatusIcon } from '@/components/payments/StatusIcon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PaymentStatus } from '@/types/dodo-payments';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function PaymentResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const status = (params.status as PaymentStatus) || 'failed';

  useEffect(() => {
    // Haptic feedback based on result
    if (status === 'active' || status === 'succeeded') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [status]);

  const getConfig = () => {
    switch (status) {
      case 'active':
      case 'succeeded':
        return {
          title: 'Payment Successful!',
          message: 'Thank you for subscribing to Premium. Your account has been upgraded.',
          primaryButton: 'Continue',
          primaryAction: () => router.replace('/'),
        };
      default:
        return {
          title: 'Payment Failed',
          message: params.message || 'Something went wrong. Please try again.',
          primaryButton: 'Try Again',
          primaryAction: () => router.replace('/'),
          secondaryButton: 'Go Back',
          secondaryAction: () => router.back(),
        };
    }
  };

  const config = getConfig();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Status Icon */}
        <View style={styles.iconWrapper}>
          <StatusIcon status={status} />
        </View>

        {/* Title */}
        <ThemedText type="title" style={styles.title}>
          {config.title}
        </ThemedText>

        {/* Message */}
        <ThemedText style={styles.message}>{config.message}</ThemedText>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={config.primaryAction}
            style={({ pressed }) => [
              styles.button,
              styles.primaryButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <ThemedText style={styles.primaryButtonText}>
              {config.primaryButton}
            </ThemedText>
          </Pressable>

          {config.secondaryButton && (
            <Pressable
              onPress={config.secondaryAction}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <ThemedText style={styles.secondaryButtonText}>
                {config.secondaryButton}
              </ThemedText>
            </Pressable>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconWrapper: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  details: {
    width: '100%',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginRight: 12,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

