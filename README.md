# Dodo Payments Expo Boilerplate

  <a href="https://discord.gg/bYqAp4ayYh">
    <img src="https://img.shields.io/discord/1305511580854779984?label=Join%20Discord&logo=discord" alt="Join Discord" />
  </a>
  <a href="https://twitter.com/dodopayments">
    <img src="https://img.shields.io/twitter/follow/dodopayments?label=Follow&style=social" alt="Twitter Follow" />
  </a>

A minimal and production-ready React Native Expo boilerplate for integrating [Dodo Payments](https://dodopayments.com). This boilerplate helps you quickly set up a clean payment flow with in-app browser support and deep links.

## Demo

<a href="https://youtube.com/shorts/78N1qw14m0Y">
  <img src="./images/demo.png" alt="Demo of Dodo Payments Expo Boilerplate" style="width:60%;">
</a>

## Features

- **Complete Payment Flow** - Ready-to-use checkout UI with payment result handling
- **In-App Browser Integration** - Payment checkout via `expo-web-browser`
- **Deep Linking** - Automatic callback routing for payment results (`yourapp://payment/result`)
- **Reusable Components** - Modular payment UI components (ProductCard, FeatureList, StatusIcon)
- **Demo Backend Server** - Express.js example server for checkout session creation
- **TypeScript Support** - Fully typed with minimal, focused types
- **Dark Mode** - Theme support for light and dark modes
- **Haptic Feedback** - Native vibration feedback for better UX
- **Easy Customization** - Centralized config for products, pricing, and features

## Prerequisites

Before you begin:

- **Node.js** v18+
- **Expo CLI** (`npm install -g expo-cli`)
- **Dodo Payments Account** - [Sign up](https://dodopayments.com)

## Quick Start

### 1. Install & Setup

```bash
# Clone and install
git clone https://github.com/dodopayments/expo-boilerplate.git
cd expo-boilerplate
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment

**App Environment:**

```bash
# Copy example config
cp .env.example .env
```

Edit `.env`:

```env
# Your backend URL (e.g., http://localhost:3000 for local development)
EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Server Environment:**

```bash
# In the server directory
cp .env.example .env
```

Edit `server/.env`:

```env
# Dodo Payments API Key
DODOPAYMENTS_API_KEY=your_api_key_here

# Environment (defaults to test_mode)
DODOPAYMENTS_ENVIRONMENT=test_mode

# Return URL
# Must match your app's scheme in app.json
DODOPAYMENTS_RETURN_URL=yourapp://payment/result

# Server Port (defaults to 3000)
PORT=3000
```

The demo server has hardcoded values for simplicity. In production, you'll replace this with your own backend that includes authentication, database integration, and proper customer/product management.

### 3. Update App Configuration

Edit `app.json` to match your app (update all "dodoexpo" references with your app's scheme and identifiers):

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "scheme": "yourapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.app"
    },
    "android": {
      "package": "com.yourcompany.app"
    }
  }
}
```

**Important**: The `scheme` is used for deep linking back to your app after payment. It must match the `DODOPAYMENTS_RETURN_URL` in your server `.env` file.

### 4. Customize Product Details

Edit `config/product.ts` to update your premium plan:

```typescript
export const HEADER_CONFIG = {
  title: 'Your Plan Name',
  subtitle: 'Your subtitle',
};

export const PRODUCT_CONFIG = {
  price: '$19.99',
  period: '/month',
  badge: 'MOST POPULAR',
  description: 'Your description',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
  ],
  buttonText: 'Subscribe Now',
  disclaimer: 'Cancel anytime. No hidden fees.',
};
```

### 5. Run the App

**Terminal 1 - Start Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Start Expo:**

```bash
npm start          # Start dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
```

## Backend Setup

Your backend needs **one endpoint** to create checkout sessions:

### POST `/checkout`

The included `server/server.js` provides a simple working example.

**Note:** This is a minimal demo server. In production, you should:

- Add authentication to verify users
- Get customer info from your database
- Store product IDs in environment variables
- Add proper error handling
- Implement webhooks for payment verification

**Response Format:**

```json
{
  "checkout_url": "https://checkout.dodopayments.com/session/xxx",
  "session_id": "session_xxx"
}
```

For more examples, see [Dodo Payments Checkout Session Docs](https://docs.dodopayments.com/developer-resources/checkout-session).

## App Structure

```text
app/
├── (tabs)/
│   ├── index.tsx        # Premium plan card + checkout button
│   └── profile.tsx      # Profile placeholder
├── payment/
│   └── result.tsx       # Payment result screen
└── _layout.tsx          # Root layout with deep linking

components/
├── payments/            # Payment-specific components
│   ├── ProductCard.tsx      # Complete product card
│   ├── FeatureList.tsx      # Feature list with checkmarks
│   ├── PricingDisplay.tsx   # Price and period display
│   ├── StatusIcon.tsx       # Payment status icon
│   ├── PaymentButton.tsx    # Reusable payment button
│   └── LoadingOverlay.tsx   # Loading overlay
├── themed-text.tsx      # Theme-aware text component
└── themed-view.tsx      # Theme-aware view component

config/
├── env.ts               # Environment configuration
└── product.ts           # Product details configuration

services/
└── dodo-payments.ts     # Payment service

types/
└── dodo-payments.ts     # TypeScript types

server/
├── server.js            # Demo Express server
├── package.json         # Server dependencies
└── .env.example         # Server environment template
```

## Deep Linking

The app handles payment results via deep links:

```text
yourapp://payment/result?status=succeeded
yourapp://payment/result?status=active
yourapp://payment/result?status=failed&message=Card%20declined
```

## Customization

### Update Premium Plan

Edit `config/product.ts` to customize all product details in one place:

```typescript
export const PRODUCT_CONFIG = {
  price: '$29.99',              // Change price
  period: '/year',              // Change period
  badge: 'BEST VALUE',          // Change badge
  description: 'Your text',     // Change description
  features: [                   // Add/remove features
    'Feature 1',
    'Feature 2',
  ],
  buttonText: 'Get Started',    // Change button text
  disclaimer: 'Your disclaimer', // Change disclaimer
};
```

All changes automatically update the UI!

### Add Multiple Plans

Want to offer multiple pricing tiers? You can easily create multiple product cards:

```typescript
// In config/product.ts
export const PLANS = {
  basic: { price: '$5.00', ... },
  premium: { price: '$10.00', ... },
  pro: { price: '$20.00', ... },
};

// In app/(tabs)/index.tsx
{Object.values(PLANS).map(plan => (
  <ProductCard key={plan.price} {...plan} onCheckout={handleCheckout} />
))}
```

### Customize Colors

Edit `constants/theme.ts` to update app-wide colors:

```typescript
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
  },
};
```

## Testing

### Test Cards

Use these test cards from Dodo Payments:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`

### Testing Flow

1. Start the backend server: `cd server && npm run dev`
2. Start Expo: `npm start`
3. Tap "Subscribe Now" in the app
4. Complete checkout with test card
5. Get redirected back with result

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend not connecting | Check `EXPO_PUBLIC_BACKEND_URL` in `.env`. Ensure server is running on correct port. |
| Deep links not working | Verify `scheme` in `app.json` matches your return URL. Rebuild app: `expo run:ios` or `expo run:android` |
| Payment browser won't open | Check server logs for errors. Ensure API key is set in server `.env` |
| Env variables not loading | Restart Expo with cache clear: `npm start -- -c` |
| Server errors | Check server `.env` has `DODOPAYMENTS_API_KEY` set |

## Resources

- [Dodo Payments Docs](https://docs.dodopayments.com)
- [Checkout Sessions API](https://docs.dodopayments.com/developer-resources/checkout-session)
- [Mobile Integration Guide](https://docs.dodopayments.com/developer-resources/mobile-integration)
- [Expo Docs](https://docs.expo.dev/)
- [Expo Web Browser](https://docs.expo.dev/versions/latest/sdk/webbrowser)

## Deployment

### Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (first time only)
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Environment Variables for Production

1. Update `.env` with production backend URL
2. Replace the demo server with your own backend that includes:
   - Authentication and user management
   - Database integration for customer data
   - Product management
   - Webhook handling
   - Proper error handling and logging

### Deploy Backend

Deploy your backend to:

- **Railway**
- **Heroku**
- **AWS/GCP/Azure**

Make sure to set all environment variables in your hosting platform.

## Next Steps

1. **Customize** `config/product.ts` with your product details
2. **Set up** your backend with proper authentication
3. **Get** Dodo Payments API keys from dashboard
4. **Test** thoroughly with test mode
5. **Add** subscription management to profile screen
6. **Implement** webhooks for server-side payment verification
7. **Deploy** using `eas build`

## Security Best Practices

- **Never** store API keys in the mobile app
- **Always** create checkout sessions server-side
- **Always** verify payments server-side using webhooks
- **Always** authenticate users before creating checkout sessions
- Use environment variables for all sensitive data

---
