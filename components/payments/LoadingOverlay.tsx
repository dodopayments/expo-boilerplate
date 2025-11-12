/**
 * LoadingOverlay component
 * Full-screen loading indicator for checkout process
 */

import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({
  visible,
  message = 'Processing payment...',
}: LoadingOverlayProps) {
  const backgroundColor = useThemeColor(
    { light: '#FFFFFF', dark: '#1A1A1A' },
    'background'
  );
  const spinnerColor = useThemeColor(
    { light: '#007AFF', dark: '#0A84FF' },
    'tint'
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }]}>
          <ActivityIndicator size="large" color={spinnerColor} />
          <ThemedText style={styles.message}>{message}</ThemedText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

