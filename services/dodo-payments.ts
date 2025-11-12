/**
 * Dodo Payments service
 * Handles checkout session creation and payment flow
 */

import { env } from '@/config/env';
import {
  CheckoutSessionResponse
} from '@/types/dodo-payments';
import * as WebBrowser from 'expo-web-browser';

/**
 * Creates a checkout session via backend API
 * 
 * @returns Checkout session with checkout_url and session_id
 * 
 * @example
 * ```typescript
 * const session = await createCheckoutSession();
 * ```
 * 
 */
export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  try {
    // In production, backend determines customer from authenticated session
    const response = await fetch(`${env.backendUrl}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Failed to create checkout session:', error);
    throw new Error(
      error.message || 'Failed to create checkout session. Please try again.'
    );
  }
}

/**
 * Opens checkout URL in an in-app browser
 * 
 * @param checkoutUrl - The checkout URL from Dodo Payments
 * 
 * @example
 * ```typescript
 * const session = await createCheckoutSession();
 * await openCheckoutBrowser(session.checkout_url);
 * // Browser opens, user completes checkout
 * // Payment result comes via deep link
 * ```
 */
export async function openCheckoutBrowser(
  checkoutUrl: string
): Promise<void> {
  try {
    await WebBrowser.openBrowserAsync(checkoutUrl, {
      // iOS options
      dismissButtonStyle: 'close',
      readerMode: false,
      
      // Android options
      showTitle: true,
      enableDefaultShareMenuItem: false,
      
      // Common options
      toolbarColor: '#ffffff',
      controlsColor: '#000000',
      showInRecents: false,
    });
  } catch (error: any) {
    console.error('Failed to open checkout browser:', error);
    throw new Error('Failed to open payment page. Please try again.');
  }
}

/**
 * Handles the complete checkout flow
 * Creates session and opens checkout in in-app browser
 * Payment result will be delivered via deep link callback
 * 
 * @example
 * ```typescript
 * try {
 *   await initiateCheckout();
 *   // Browser opens with checkout
 *   // Payment result comes via deep link
 * } catch (error) {
 *   console.error('Checkout failed:', error);
 * }
 * ```
 */
export async function initiateCheckout(): Promise<void> {
  // Step 1: Create checkout session
  const session = await createCheckoutSession();

  // Step 2: Open checkout in browser
  await openCheckoutBrowser(session.checkout_url);
}
