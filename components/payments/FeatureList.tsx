/**
 * FeatureList component
 * Displays a list of product features with checkmark icons
 */

import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface FeatureListProps {
  features: string[];
  iconColor?: string;
}

export function FeatureList({ features, iconColor = '#4CAF50' }: FeatureListProps) {
  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <ThemedText style={[styles.featureIcon, { color: iconColor }]}>
            ✓
          </ThemedText>
          <ThemedText style={styles.featureText}>{feature}</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
});

