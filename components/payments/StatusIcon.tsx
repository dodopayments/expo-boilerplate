/**
 * StatusIcon component
 * Displays a circular icon indicating payment status (success, error, etc.)
 */

import { ThemedText } from '@/components/themed-text';
import { PaymentStatus } from '@/types/dodo-payments';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StatusIconProps {
  status: PaymentStatus;
}

export function StatusIcon({ status }: StatusIconProps) {
  const getIconConfig = () => {
    switch (status) {
      case 'succeeded':
      case 'active':
        return {
          icon: '✓',
          color: '#4CAF50',
        };
      default:
        return {
          icon: '!',
          color: '#F44336',
        };
    }
  };

  const config = getIconConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.color }]}>
      <ThemedText style={styles.icon}>{config.icon}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

