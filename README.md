# 🪄 Spell-icious

A magical web application to help teams decide where to have lunch through an animated restaurant race! Cast a spell and let magic decide! ✨

![Status](https://img.shields.io/badge/status-active-success)
![React Router](https://img.shields.io/badge/React%20Router-v7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ⚡ Quick Start

Get started in 5 minutes? **[See Quick Start Guide](./QUICKSTART.md)**

```bash
npm install && npm run dev
```

## 📖 Documentation

- ⚡ **[Quick Start](./QUICKSTART.md)** - Get started in 5 minutes
- 📚 **[User Guide](./USER_GUIDE.md)** - How to use the application
- 🔍 **[Fuzzy Search Guide](./FUZZY_SEARCH.md)** - Intelligent search with Fuse.js
- 🗺️ **[OpenStreetMap Guide](./OPENSTREETMAP_GUIDE.md)** - How OSM integration works
- 🏗️ **[API Architecture](./API_ARCHITECTURE.md)** - API Architecture (Resource Routes)
- 🏗️ **[SSR + Cache Architecture](./SSR_CACHE_ARCHITECTURE.md)** - Server-Side Rendering with Cache
- 🎭 **[MSW Guide](./MSW_GUIDE.md)** - Mock Service Worker (development without API)
- 🚀 **[Deploy Guide](./DEPLOYMENT.md)** - How to deploy
- 🗺️ **[Roadmap](./ROADMAP.md)** - Future features and improvements
- 🤝 **[Contributing](./CONTRIBUTING.md)** - How to contribute
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
│   │   ├── Loading.tsx      # Loading component
│   │   ├── RestaurantCard.tsx # Restaurant card
│   │   └── ManualRestaurantInput.tsx # Manual entry component
│   ├── contexts/            # React Contexts
│   │   └── RestaurantsAPIContext.tsx # API Provider
│   ├── config/              # Configuration
│   │   └── emojis.ts        # Auto-generated emoji config
│   ├── lib/                 # Utilities and libraries
│   │   └── places.server.ts # Server-only functions (secure)
│   ├── mocks/               # MSW Mock Service Worker
│   │   ├── handlers.ts      # Mock API handlers
│   │   └── browser.ts       # MSW setup
│   ├── routes/              # Application routes
│   │   ├── home.tsx         # Home page
│   │   ├── select.tsx       # Restaurant selection
│   │   ├── race.tsx         # Race page
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
├── README.md                # This file
├── IMAGES_QUICKSTART.md     # Image management guide
├── IMAGE_OPTIMIZATION.md    # Technical optimization docs
└── ... (other docs)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
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

Edit the `getRestaurantIcon` function in `app/routes/race.tsx`:

```typescript
const typeMap: Record<string, string> = {
  italian: "🍝",
  pizza: "🍕",
  // add more here
};
```

### Change Race Colors

Edit the `colors` array in `app/routes/race.tsx`:

```typescript
const colors = [
  "from-red-500 to-red-600",
  "from-blue-500 to-blue-600",
  /* add more here */
];
```

### Adjust Race Speed

In `app/routes/race.tsx`, adjust the duration values:

```typescript
duration: Math.random() * 8 + 12, // Change values here (12-20 seconds)
```

## 🎨 Recent Updates

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
