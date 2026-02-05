# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-02-05

### ✨ Added

#### Avatar Component System

- **New Reusable Avatar Component** (`app/components/Avatar.tsx`)
  - Supports custom images (data URLs, file paths) and emoji characters
  - Six size presets: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (80px)
  - Optional edit icon overlay on hover with smooth animations
  - Dark mode support with adaptive styling
  - Framer Motion integration for smooth scale effects
  - Fallback icon support when no image/emoji provided
- **ResponsiveAvatar Component**
  - Automatically scales based on screen size (mobile, tablet, desktop)
  - Separate size props for each breakpoint
  - Perfect for mobile-first design
- **AvatarGroup Component**
  - Display multiple avatars with overlapping layout
  - Shows "+N" indicator for remaining avatars
  - Configurable max display limit
- **Comprehensive Documentation**
  - Complete usage guide in `app/components/Avatar/README.md`
  - Props reference and examples
  - Integration examples for all use cases

#### Mobile Responsiveness

- **Complete Mobile Optimization** across all pages
  - Quick Race page: Responsive headings (text-3xl → text-5xl), adaptive padding (p-4 → p-8)
  - Home page: Mobile-friendly forms, smaller buttons, responsive Quick Race CTA
  - Select page: Reordered layout (participants first on mobile), mobile-optimized header
  - Race page: Responsive countdown (text-6xl → text-9xl), adaptive race lanes
  - WinnerModal: Responsive trophy (text-6xl → text-9xl), mobile-friendly buttons
- **Touch-Friendly Interface**
  - Larger touch targets for all interactive elements
  - Proper button sizing (py-3 → py-5 on desktop)
  - Active states with `active:scale-95` for better touch feedback
  - Optimized hit areas for emoji pickers
- **Responsive Layout Improvements**
  - Truncated text for long restaurant names and addresses
  - Adaptive grids (4 columns for team photos on mobile)
  - Better spacing with responsive gap and padding classes
  - Full-width emoji pickers on mobile with max-height constraints

#### Emoji Picker Enhancements

- **Larger Food Emojis** in all emoji pickers
  - Increased from `text-lg/xl` (18-20px) to `text-2xl/3xl` (24-30px)
  - Better visibility and easier selection on mobile devices
- **Improved Spacing and Layout**
  - Increased gaps from `gap-1` to `gap-2` for better separation
  - Increased padding from `p-1` to `p-2` for larger touch targets
  - Consistent sizing across ManualRestaurantInput, ParticipantItem, Select page, and RestaurantCard
- **Enhanced Touch Targets**
  - Minimum 48x48px touch area (WCAG AAA compliant)
  - Hover and active states for better feedback
  - Smooth scale animations (hover: 1.25x, active: 0.95x)

### 🔄 Changed

#### Component Refactoring with Avatar

- **ParticipantItem Component**
  - Replaced manual emoji/image rendering with `<Avatar>` component
  - Added `showEditIcon` for consistent edit overlay behavior
  - Maintains all original functionality with cleaner code
- **RaceLane Component**
  - Refactored racer icon display to use `<Avatar>`
  - Preserved all racing animations and effects
  - Improved code maintainability
- **WinnerModal Component**
  - Updated winner display to use `<Avatar size="2xl">`
  - Maintained glowing animation effect
  - Consistent responsive sizing
- **RestaurantCard Component**
  - Replaced emoji displays in header and "Pick Icon" button
  - Centralized avatar logic for consistency
  - Reduced code duplication

#### Code Quality Improvements

- **DRY Principle Applied**
  - Eliminated repetitive image/emoji conditional rendering across components
  - Single source of truth for avatar display logic
  - Easier maintenance and updates
- **Better Component Organization**
  - Clear separation of concerns with dedicated Avatar component
  - Barrel exports for clean imports
  - Comprehensive inline documentation

### 🎨 Improved

- **Consistency** - All avatars now use the same component with uniform styling
- **Maintainability** - Change avatar behavior in one place affects all usages
- **Accessibility** - Built-in alt text support for all avatars
- **Developer Experience** - Easy to add avatars anywhere with simple props API
- **User Experience** - Smooth animations and responsive design across all devices

### 📚 Documentation

- Added Avatar component README with complete API reference
- Updated main README with v2.3.0 changes
- Added component migration guide
- Updated project structure documentation

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
