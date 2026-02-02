# 🪄 Spell-icious

A magical web application to help teams decide where to have lunch through an animated restaurant race! Cast a spell and let magic decide! ✨

![Status](https://img.shields.io/badge/status-active-success)
![React Router](https://img.shields.io/badge/React%20Router-v7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ⚡ Quick Start

```bash
npm install && npm run dev
```

## 📖 Documentation

- 📝 **[Changelog](./CHANGELOG.md)** - Version history

## 🎯 Features

- **🪄 Magic-Themed UI**: Enchanting interface with spell-casting theme
- **⚡ Quick Race Mode**: Add restaurants manually and race instantly
- **🎨 Custom Emoji System**: Team photos as racers (auto-optimized)
- **🌍 Location Search**: Enter an address and define a search radius
- **🔍 Intelligent Fuzzy Search**: Typo-tolerant search by name, food type (ramen, italian, sushi) or location using Fuse.js
- **📋 Restaurant List**: View nearby restaurants from OpenStreetMap data
- **✏️ Custom Selection**: Manually add restaurants to the race
- **🏁 Animated Race**: Exciting race with smooth animations (Motion/Framer Motion)
- **🎨 Dynamic Icons**: Each restaurant races with an icon based on its cuisine type
- **💎 Modern Design**: Beautiful interface with consistent orange theme and dark mode
- **📍 Fixed Header**: Always-visible search bar and navigation in restaurant selection
- **🗺️ Google Maps Integration**: Direct links to restaurants on Google Maps with coordinates
- **🏙️ City Filtering**: Smart filtering to show only restaurants from the searched city
- **📏 Distance Validation**: Restaurants are filtered by actual distance, not just API results
- **🎨 Custom Scrollbar**: Orange-themed scrollbar matching the app's design
- **📱 Optimized Layout**: Participants panel with controlled height and smooth scrolling on desktop
- **⚡ Server-Side Cache**: Cached responses (5min TTL) for performance
- **🎭 MSW Mock API**: Works without API key using Mock Service Worker
- **🌐 Fully in English**: Complete interface translation
- **📱 Responsive**: Mobile-first design that works on all devices
- **🖼️ Image Optimization**: Automatic 97% size reduction with Sharp

## 📁 Project Structure

```
spell-icious/
├── app/
│   ├── components/          # Reusable components
│   │   ├── race/           # Race components (modular)
│   │   │   ├── RaceHeader.tsx
│   │   │   ├── CountdownDisplay.tsx
│   │   │   ├── WinnerBadge.tsx
│   │   │   ├── WinnerModal.tsx
│   │   │   ├── RaceLane.tsx
│   │   │   ├── RaceInstructions.tsx
│   │   │   ├── ConfettiEffect.tsx
│   │   │   ├── types.ts
│   │   │   ├── utils.ts
│   │   │   ├── index.ts    # Barrel export
│   │   │   └── README.md   # Component guide
│   │   ├── Loading.tsx      # Loading component
│   │   ├── RestaurantCard.tsx # Restaurant card
│   │   └── ManualRestaurantInput.tsx # Manual entry component
│   ├── contexts/            # React Contexts
│   │   └── RestaurantsAPIContext.tsx # API Provider
│   ├── config/              # Configuration
│   │   └── emojis.ts        # Auto-generated emoji config
│   ├── lib/                 # Utilities and libraries
│   │   ├── places.server.ts # Server-only functions (secure)
│   │   └── constants.ts     # Constants
│   ├── mocks/               # MSW Mock Service Worker
│   │   ├── handlers.ts      # Mock API handlers
│   │   └── browser.ts       # MSW setup
│   ├── routes/              # Application routes
│   │   ├── home.tsx         # Home page
│   │   ├── select.tsx       # Restaurant selection (with cache)
│   │   ├── race.tsx         # Race page (refactored, 197 lines)
│   │   ├── quick-race.tsx   # Quick Race mode (manual only)
│   │   └── api.restaurants.ts # API endpoint: search
│   ├── app.css              # Global styles and animations
│   ├── root.tsx             # Main layout + Providers
│   └── routes.ts            # Route configuration
├── public/                  # Static assets
│   ├── emojis/              # Team photos (optimized)
│   ├── emojis-backup/       # Original images backup
│   ├── favicon.svg          # Spell-icious favicon
│   └── mockServiceWorker.js # MSW Service Worker
├── scripts/                 # Automation scripts
│   ├── generate-emoji-config.cjs # Auto-detect emojis
│   ├── optimize-images.cjs  # Image optimization (Sharp)
│   ├── process-images.cjs   # Complete pipeline
│   └── add-image.cjs        # Interactive image addition
├── Dockerfile               # Docker configuration (Node.js 24.11.1)
├── .nvmrc                   # Node version (24.11.1)
├── README.md                # This file
└── ... (other docs)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 24.11.1+
- npm or yarn

### Installation

1. Clone the repository:

```bash
cd spell-icious
```

2. Install dependencies:

```bash
npm install
```

3. No configuration needed!

**OpenStreetMap is ready to use:**

```bash
npm run dev
```

OpenStreetMap is completely free and doesn't require any API key.

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## 🛠️ Technologies

- **React Router v7** (Framework Mode)
- **Node.js v24.11.1** - Latest LTS version
- **Tailwind CSS v4** - Modern styling
- **TypeScript** - Type safety
- **Vite** - Ultra-fast build tool
- **OpenStreetMap + Overpass API** - Free restaurant data (100% free!)
- **Fuse.js** - Intelligent and typo-tolerant search
- **Motion/Framer Motion** - Smooth and professional animations

## 📱 How to Use

1. **Home Page**: Enter your address or location and adjust the search radius
2. **Select Restaurants**:
   - Click on restaurants from the list to add them to the race
   - Use the smart search bar to filter:
     - By name: "bella", "sushi garden"
     - By food type: "ramen", "italian", "sushi", "vegetarian"
     - By location: "downtown", "city center"
     - Typo-tolerant: "piza" finds "pizza", "susi" finds "sushi"
   - Add custom restaurants manually
3. **Race**: Click "Start Race" and watch the restaurants compete!
4. **Winner**: The winning restaurant is where you'll have lunch! 🏆

## 🎨 Design Features

- **Consistent Orange Theme** 🧡 - All titles and main buttons use orange color
- **Smooth Animations** - Fluid transitions and effects
- **Fully Responsive** - Mobile-first interface
- **Dark Mode** - Automatic dark theme support
- **Clean Countdown** - Simplified countdown without excessive effects
- **Global Loader** - Orange loading bar during navigation with infinite loop
- **Minimal & Modern** - Clean code without unnecessary comments

## 🔧 Available Scripts

### Main Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Check TypeScript types

### Image Management

- `npm run add-image` - Interactive image addition wizard
- `npm run process-images` - Complete optimization pipeline
- `npm run optimize-images` - Optimize images (Sharp)
- `npm run generate-emojis` - Regenerate emoji config
- `npm run restore-original-images` - Restore from backup

See [IMAGES_QUICKSTART.md](./IMAGES_QUICKSTART.md) for detailed image management guide.

## 📝 OpenStreetMap + Overpass API

The application uses **OpenStreetMap** to fetch restaurants:

### Features 🗺️

- ✅ **100% Free** - No API key needed
- ✅ **No Limits** - No rate limits
- ✅ **Open Data** - Collaborative community
- ✅ **Global** - Worldwide coverage
- ⚠️ **No Native Ratings** - OSM doesn't have a rating system

### How It Works

1. **Nominatim API** - Converts addresses to coordinates (geocoding)
2. **Overpass API** - Searches for nearby restaurants, cafes
3. **Fallback** - Mock data if APIs don't respond

### Offline Mode / Mock Data

The application works perfectly with mock data:

- 🎭 5 example restaurants in Lisbon
- ✅ Test all features
- 🚀 Fast development without configuration

## 🎮 Customization

### Add More Food Emojis

Edit the `getRestaurantIcon` function in `app/components/race/utils.ts`:

```typescript
const typeMap: Record<string, string> = {
  italian: "🍝",
  pizza: "🍕",
  // add more here
};
```

### Change Race Colors

Edit the `colors` array in `app/components/race/types.ts`:

```typescript
const colors = [
  "from-red-500 to-red-600",
  "from-blue-500 to-blue-600",
  /* add more here */
];
```

### Adjust Race Speed

In `app/routes/race.tsx`, adjust the duration values in the `beginRace` function:

```typescript
duration: Math.random() * 8 + 12, // Change values here (12-20 seconds)
```

## 🎨 Recent Updates

### v2.2.0 - UI/UX Enhancements & Location Features

#### 🎨 UI/UX Improvements

- **Fixed Header** - Search bar and navigation stay visible while scrolling
- **Orange Scrollbar** - Custom-styled scrollbar matching the app's theme
- **Optimized Participants Panel** - Desktop layout with controlled height and smooth scrolling
- **Better Alignment** - Consistent spacing between restaurant list and participants panel

#### 🗺️ Location Features

- **Google Maps Integration** - Direct "View on Google Maps" button with precise coordinates
- **City Filtering** - Smart filtering to show only restaurants from the searched city
- **Distance Validation** - Additional distance check ensures results within specified radius
- **Improved Geocoding** - Enhanced city detection from OpenStreetMap Nominatim API

#### 🐛 Bug Fixes

- ✅ Fixed scrollbar visibility issues
- ✅ Fixed double scrollbar problem
- ✅ Improved restaurant card layout with better CTAs
- ✅ Enhanced phone number display (non-clickable, information only)

#### 📚 Code Quality

- Centralized Google Maps URL utility function
- Better separation of concerns
- Improved TypeScript types
- Enhanced logging for debugging

### v2.1.0 - Architecture Refactoring & Bug Fixes

#### 🏗️ Major Refactoring

- **Race Components Modularization** - Split 1,281-line `race.tsx` into 10 organized components
  - `RaceHeader.tsx` - Header with back button
  - `CountdownDisplay.tsx` - Countdown animation
  - `WinnerBadge.tsx` - Winner announcement badge
  - `WinnerModal.tsx` - Full winner details modal
  - `RaceLane.tsx` - Individual race track
  - `RaceInstructions.tsx` - Instructions display
  - `ConfettiEffect.tsx` - Celebration effects
  - `types.ts` - Shared TypeScript types
  - `utils.ts` - Helper functions
  - `index.ts` - Barrel export for clean imports
- **Main race.tsx reduced to 197 lines** (85% reduction!)
- **Better separation of concerns** - Each component has single responsibility
- **Improved maintainability** - Easier to test and debug

#### 🐛 Bug Fixes

- ✅ Fixed Error 431 - Implemented cache size limit (10 entries max) in `select.tsx`
- ✅ Fixed double race trigger - Added `raceStartedRef` to prevent duplicate starts
- ✅ Fixed countdown not resetting - Properly reset countdown state on race restart
- ✅ Fixed same winner on restart - Clear timeout before starting new race
- ✅ Fixed modal X button - Now properly resets race instead of just closing

#### 🚀 Performance Improvements

- **Cache Management** - Automatic cleanup of expired entries (5min TTL)
- **Memory Optimization** - Limited cache size prevents memory issues
- **Component Optimization** - All callbacks properly memoized with `useCallback`
- **Ref Usage** - Refs prevent unnecessary re-renders

#### 🔧 Technical Improvements

- Updated to **Node.js v24.11.1** (latest LTS)
- Added `.nvmrc` for version management
- Added `engines` field in `package.json`
- Updated Dockerfile to use Node.js v24.11.1-alpine
- Zero TypeScript and linting errors

#### 📚 Documentation

- Added comprehensive architecture documentation
- Created component usage guide
- Added refactoring summary
- Improved code organization

### v2.0.0 - Major UI/UX Improvements

- 🌍 **Full English Translation** - Complete interface in English
- 🧡 **Consistent Orange Theme** - Unified color scheme across all pages
- 🎯 **Simplified Countdown** - Clean countdown without excessive effects
- 🔄 **Infinite Loop Loader** - Global navigation loader with continuous animation
- 🌓 **Consistent Theme** - Unified light/dark mode support on all pages
- 🧹 **Clean Code** - Removed all code comments for cleaner codebase
- 🗑️ **Removed Unused Code** - Deleted unused API endpoint and references
- ⚡ **Performance** - Optimized animations and reduced bundle size

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) for details.

## 🌟 Show Your Support

If this project helped you, give it a ⭐️ on GitHub!

## 👨‍💻 Author

Created with ❤️ and 🍕

---

**Cast your spell and enjoy your meal! 🪄✨**
