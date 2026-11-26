# ShoeZam

ShoeZam is a mobile shoe-shopping app built with Expo and React Native. You can browse shoes by brand, search the catalog, and save products to your wishlist or shopping bag.

## Why I Made This

I wanted to recreate one of my old school projects and try building it with modern tech for mobile app development. The original ShoeZam was a desktop app I made with Java, Java Swing, object-oriented programming, and Eclipse IDE. Since a footwear e-commerce app felt more suited to a website or mobile app, I decided to remake it as a mobile app.

## Features

- Browse the shoe catalog and brand collections
- Search products by name or brand
- Filter products by brand, color, and size
- Sort products by name or price
- Add products to a wishlist
- Add shoes to the shopping bag and adjust quantities
- Keep the bag, wishlist, addresses, profile, and order history saved on the device between app launches
- Sign in and create an account with Supabase Auth

> **Project status:** Shoe and brand information and shopping data are stored locally in the app. Supabase authentication requires a project and local environment configuration before sign-in and registration can be used. Checkout currently supports Cash on Delivery.

## Project Structure

```text
src/
  app/         App screens and navigation routes
  components/  Reusable interface components
  context/     Shared app state, such as the bag and wishlist
  data/        Local product and brand data
  styles/      Styles grouped by screen or component
  theme/       Shared colors and visual settings
  utils/       Shared helper functions, including catalog filtering and sorting
```

To add or update the sample catalog, edit the files in `src/data/`. App screens are in `src/app/`.

## Supabase Authentication Setup

1. Create a Supabase project and enable email/password authentication with email confirmation.
2. In the Supabase Auth URL configuration, allow the app callback URL `shoezam://auth/callback`.
3. Copy `.env.example` to `.env.local` and add the project URL and publishable key from the Supabase project settings. Use the `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY` variable names.
4. Restart Expo after changing environment variables.

The app uses only the Supabase publishable key. Never put a service-role key in the mobile app or commit `.env.local`. Expo Go creates a temporary callback URL, so use a development build with the `shoezam` scheme for reliable email-confirmation testing.
