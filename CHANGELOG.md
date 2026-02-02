# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-02-02

### ✨ Added

#### UI/UX Enhancements

- **Fixed Header** in restaurant selection page
  - Search bar always visible while scrolling
  - Back button always accessible
  - Location info persistently displayed
- **Custom Orange Scrollbar** matching app theme
  - Visible on all browsers (Chrome, Firefox, Safari, Edge)
  - Light and dark mode support
  - Smooth hover and active states
- **Optimized Participants Panel** on desktop
  - Controlled height with smooth scrolling
  - Better alignment with restaurant list
  - Improved mobile responsiveness

#### Location Features

- **Google Maps Integration**
  - "View on Google Maps" button on restaurant cards
  - Direct links with precise coordinates (lat/lng)
  - Fallback to address search if coordinates unavailable
  - Centralized utility function for URL generation
- **City-Based Filtering**
  - Smart city detection from geocoding results
  - Filters restaurants by `addr:city` tag
  - Prevents results from other cities
  - Support for major Portuguese cities
- **Enhanced Distance Validation**
  - Additional distance check after API results
  - Maximum radius limit of 5km
  - Detailed logging for debugging
  - Improved accuracy in results

#### Restaurant Card Improvements

- **Better CTAs Layout**
  - Website link with prominent styling
  - Google Maps button with full width
  - Phone number as non-clickable information
  - Organized CTA section
- **"Pick Your Icon" Button**
  - More intuitive label
  - Removed redundant "Selected" badge
  - Improved button styling

### 🐛 Fixed

- Fixed double scrollbar issue
- Fixed scrollbar visibility on macOS
- Fixed participants panel overflow on desktop
- Fixed emoji picker positioning in scrollable container
- Fixed restaurant card lat/lng prop passing

### 🔧 Changed

- Moved `getGoogleMapsUrl` to shared utils
- Updated `RestaurantCard` to use coordinates
- Enhanced OpenStreetMap geocoding with city extraction
- Improved logging for search and filtering operations

## [1.0.0] - 2026-01-31

### 🎉 Initial Release

First complete and functional version of Restaurant Race!

### ✨ Features Added

#### Core Features

- **Home Page** - Interface to enter address and search radius
  - Address input with validation
  - Adjustable radius slider (500m - 5km)
  - Modern design with gradients and animations
- **Restaurant Selection** - List and select restaurants
  - Responsive grid of restaurant cards
  - Real-time search/filter
  - Manual restaurant addition
  - Side panel with selected participants
  - Detailed information: rating, reviews, price
- **Animated Race** - Visual restaurant race
  - Countdown (3, 2, 1, GO!)
  - Smooth and realistic animations
  - Unique emojis for each participant
  - Visual effects (trails, bounce)
  - Winner celebration with confetti
  - Race again option

#### Design & UX

- Automatic dark mode (follows system preference)
- Fully responsive interface (mobile-first)
- Smooth and professional animations
- Modern and vibrant gradients
- Micro-interactions on hover/click
- Custom loading states

#### Reusable Components

- `Loading` - Animated loading component
- `RestaurantCard` - Styled restaurant card

#### Integrations

- Google Places API (optional)
  - Address geocoding
  - Nearby restaurant search
  - Fallback to mock data
- Mock data for use without API key

### 🛠️ Technologies

- **React Router v7** - Framework mode
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Node.js 18+** - Runtime
