/**
 * ProductCard component
 * Complete premium plan card with badge, pricing, features, and checkout button
 */

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FeatureList } from './FeatureList';
import { PaymentButton } from './PaymentButton';
import { PricingDisplay } from './PricingDisplay';

interface ProductCardProps {
  badge?: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  buttonText: string;
  disclaimer?: string;
  onCheckout: () => void;
  loading?: boolean;
}

export function ProductCard({
  badge,
  price,
  period,
  description,
  features,
  buttonText,
  disclaimer,
  onCheckout,
  loading = false,
}: ProductCardProps) {
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333333' }, 'text');

  return (
    <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
      {/* Badge (if provided) */}
      {badge && (
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{badge}</ThemedText>
        </View>
      )}

      {/* Pricing */}
      <PricingDisplay price={price} period={period} description={description} />

      {/* Features */}
      <View style={styles.features}>
        <FeatureList features={features} />
      </View>

      {/* Checkout Button */}
      <View style={styles.buttonContainer}>
        <PaymentButton onPress={onCheckout} title={buttonText} loading={loading} />
      </View>

      {/* Disclaimer */}
      {disclaimer && (
        <ThemedText style={styles.disclaimer}>{disclaimer}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  features: {
    marginBottom: 32,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
  },
});

