/**
 * Mapeia tipos de restaurantes para ícones apropriados
 */
export function getRestaurantIcon(types?: string[]): string {
  if (!types || types.length === 0) return "🍽️";

  const typeMap: Record<string, string> = {
    italian: "🍝",
    pizza: "🍕",
    pasta: "🍝",

    japanese: "🍣",
    sushi: "🍣",
    ramen: "🍜",
    noodle: "🍜",
    chinese: "🥡",
    thai: "🍛",
    korean: "🍲",
    vietnamese: "🍜",
    asian: "🥢",

    burger: "🍔",
    hamburger: "🍔",
    fast_food: "🍔",

    mexican: "🌮",
    taco: "🌮",
    burrito: "🌯",

    mediterranean: "🥙",
    kebab: "🥙",
    greek: "🥙",
    falafel: "🥙",

    seafood: "🦞",
    fish: "🐟",

    steakhouse: "🥩",
    barbecue: "🍖",
    grill: "🍖",

    vegetarian: "🥗",
    vegan: "🥗",
    salad: "🥗",
    healthy: "🥗",

    cafe: "☕",
    coffee: "☕",
    bakery: "🥐",
    pastry: "🥐",

    french: "🥖",
    fine_dining: "🍽️",

    indian: "🍛",
    curry: "🍛",

    portuguese: "🍲",
    traditional: "🍲",
    tapas: "🍤",

    dessert: "🍰",
    ice_cream: "🍨",
    gelato: "🍨",

    restaurant: "🍽️",
    food_court: "🍱",
  };

  for (const type of types) {
    const normalizedType = type.toLowerCase().replace(/[_\s-]/g, "_");

    if (typeMap[normalizedType]) {
      return typeMap[normalizedType];
    }

    for (const [key, icon] of Object.entries(typeMap)) {
      if (normalizedType.includes(key) || key.includes(normalizedType)) {
        return icon;
      }
    }
  }

  return "🍽️";
}
