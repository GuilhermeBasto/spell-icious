export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  types?: string[];
  lat?: number;
  lng?: number;
  customEmoji?: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  takeaway?: string;
  delivery?: string;
  outdoorSeating?: string;
  brand?: string;
  cuisine?: string;
}

export interface Racer {
  name: string;
  position: number;
  duration: number;
  color: string;
  emoji: string;
  restaurant?: Restaurant;
}

export const colors = [
  "from-red-500 to-red-600",
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-yellow-500 to-yellow-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-indigo-500 to-indigo-600",
  "from-orange-500 to-orange-600",
  "from-teal-500 to-teal-600",
  "from-cyan-500 to-cyan-600",
];
