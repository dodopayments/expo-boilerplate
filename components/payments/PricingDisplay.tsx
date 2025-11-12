/**
 * PricingDisplay component
 * Displays price, period, and description for a product
 */

import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PricingDisplayProps {
  price: string;
  period: string;
  description?: string;
}

export function PricingDisplay({ price, period, description }: PricingDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pricingSection}>
        <ThemedText style={styles.price}>{price}</ThemedText>
        <ThemedText style={styles.period}>{period}</ThemedText>
      </View>
      {description && (
        <ThemedText style={styles.description}>{description}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  pricingSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 20,
    marginLeft: 8,
    opacity: 0.7,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
});

