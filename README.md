# DeeGee (Desi Grocers) — Web Demo

This is a web demo of DeeGee aka Desi Grocers, inspired by fast-grocery apps. It showcases:

- Phone OTP login (demo phone 9131715292, demo OTP 1234)
- Product grid with shared-element product hero modal
- Smooth animations at 60fps using Framer Motion
- Fly-to-cart feel via quick add and animated modal transitions
- Skeleton loaders while content loads
- Payment Simulator modal with Success/Failure
- On Success: order is added to history with a confetti burst
- Accessible components: labeled buttons/inputs, aria-live alerts

Note: This demo uses mocked interactions on the frontend (no real backend).

## Run

The project is a Vite + React app. Start the dev server normally (already configured by the sandbox).

## Demo credentials

- Phone: 9131715292
- OTP: 1234

## Tech

- React + Vite + Tailwind CSS
- Framer Motion for animation
- Lucide React for icons

## Structure

- App composes: Header, Login, Products, Cart/Checkout with Payment Simulator, Order History.
- Prices are shown using INR formatting (₹).

## Accessibility

- Inputs and actions have labels and aria attributes where appropriate.
- Announcements for login and cart count use aria-live.

## Tests

Unit tests are not included in this web demo sandbox. In a full mobile app (React Native/Flutter) you'd add tests for login, cart, and checkout flows using the platform's testing tools (Jest/RTL or Flutter test).
