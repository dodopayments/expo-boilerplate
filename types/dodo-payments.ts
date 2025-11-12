/**
 * TypeScript type definitions for Dodo Payments integration
 */

/**
 * Payment status from Dodo Payments callback
 */
export type PaymentStatus =  'active' | 'succeeded' | 'failed';


/**
 * Response from backend after creating checkout session
 */
export interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}
