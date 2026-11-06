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

> **Project status:** Shoe and brand information is currently stored locally in the app. Checkout and some account options are not implemented yet.

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
