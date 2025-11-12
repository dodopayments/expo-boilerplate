/**
 * Products screen - Single premium plan subscription
 */

import { LoadingOverlay } from '@/components/payments/LoadingOverlay';
import { ProductCard } from '@/components/payments/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { HEADER_CONFIG, PRODUCT_CONFIG } from '@/config/product';
import { initiateCheckout } from '@/services/dodo-payments';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function ProductsScreen() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Initiate checkout
      await initiateCheckout();
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      Alert.alert(
        'Checkout Failed',
        error.message || 'Unable to start checkout. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {HEADER_CONFIG.title}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {HEADER_CONFIG.subtitle}
          </ThemedText>
        </View>

        {/* Premium Card */}
        <ProductCard
          badge={PRODUCT_CONFIG.badge}
          price={PRODUCT_CONFIG.price}
          period={PRODUCT_CONFIG.period}
          description={PRODUCT_CONFIG.description}
          features={PRODUCT_CONFIG.features}
          buttonText={PRODUCT_CONFIG.buttonText}
          disclaimer={PRODUCT_CONFIG.disclaimer}
          onCheckout={handleCheckout}
          loading={loading}
        />
      </ScrollView>

      {/* Loading Overlay */}
      <LoadingOverlay
        visible={loading}
        message="Opening checkout..."
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
