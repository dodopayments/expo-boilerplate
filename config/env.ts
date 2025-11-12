/**
 * Environment configuration
 * 
 * @example
 * ```typescript
 * import { env } from '@/config/env';
 * 
 * const apiUrl = `${env.backendUrl}/checkout`;
 * ```
 */

export const env = {
  backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000',
};

export default env;
