# Avatar Component

A flexible, reusable avatar component for Spell-icious that supports custom images, emojis, and various sizes.

## Features

- ✨ Supports custom images (data URLs, file paths)
- 🎭 Supports emoji characters
- 📏 Multiple size options (xs, sm, md, lg, xl, 2xl)
- 📱 Responsive variant for mobile-first design
- 👥 Avatar group component for displaying multiple avatars
- ✏️ Optional edit icon overlay on hover
- 🎨 Smooth animations with Framer Motion
- 🌙 Dark mode support

## Usage

### Basic Avatar

```tsx
import Avatar from "~/components/Avatar";

// With custom image
<Avatar
  src="/emojis/gui.png"
  alt="Gui"
  size="md"
/>

// With emoji
<Avatar
  emoji="🍕"
  size="lg"
/>

// With fallback
<Avatar size="sm" />
```

### Clickable Avatar with Edit Icon

```tsx
<Avatar
  src="/emojis/gui.png"
  alt="Gui"
  size="md"
  onClick={() => setShowEmojiPicker(true)}
  showEditIcon
/>
```

### Responsive Avatar

Automatically scales based on screen size:

```tsx
import { ResponsiveAvatar } from "~/components/Avatar";

<ResponsiveAvatar
  src={participant.emoji}
  mobileSize="sm" // 8x8 on mobile
  tabletSize="md" // 10x10 on tablet
  desktopSize="lg" // 12x12 on desktop
  alt={participant.name}
/>;
```

### Avatar Group

Display multiple avatars with overlap:

```tsx
import { AvatarGroup } from "~/components/Avatar";

<AvatarGroup
  avatars={[
    { src: "/emojis/gui.png", alt: "Gui" },
    { emoji: "🍕", alt: "Pizza" },
    { src: "/emojis/bruno.png", alt: "Bruno" },
    { emoji: "🍜", alt: "Ramen" },
  ]}
  size="md"
  max={3} // Show 3 avatars + "+N" for remaining
/>;
```

## Props

### Avatar Props

| Prop           | Type         | Default    | Description                            |
| -------------- | ------------ | ---------- | -------------------------------------- |
| `src`          | `string`     | -          | Image URL (data URL or file path)      |
| `emoji`        | `string`     | -          | Emoji character to display             |
| `alt`          | `string`     | `"Avatar"` | Alt text for accessibility             |
| `size`         | `AvatarSize` | `"md"`     | Size preset (xs, sm, md, lg, xl, 2xl)  |
| `className`    | `string`     | `""`       | Additional CSS classes                 |
| `onClick`      | `() => void` | -          | Click handler (makes avatar clickable) |
| `showEditIcon` | `boolean`    | `false`    | Show edit icon on hover                |
| `fallbackIcon` | `string`     | `"👤"`     | Icon to show when no src/emoji         |

### ResponsiveAvatar Props

All Avatar props plus:

| Prop          | Type         | Default | Description             |
| ------------- | ------------ | ------- | ----------------------- |
| `mobileSize`  | `AvatarSize` | `"sm"`  | Size on mobile screens  |
| `tabletSize`  | `AvatarSize` | `"md"`  | Size on tablet screens  |
| `desktopSize` | `AvatarSize` | `"lg"`  | Size on desktop screens |

### AvatarGroup Props

| Prop        | Type                          | Default | Description                |
| ----------- | ----------------------------- | ------- | -------------------------- |
| `avatars`   | `Array<{src?, emoji?, alt?}>` | -       | Array of avatar data       |
| `size`      | `AvatarSize`                  | `"md"`  | Size for all avatars       |
| `max`       | `number`                      | `5`     | Maximum avatars to display |
| `className` | `string`                      | `""`    | Additional CSS classes     |

## Size Reference

| Size  | Dimensions | Text Size |
| ----- | ---------- | --------- |
| `xs`  | 24x24px    | 14px      |
| `sm`  | 32x32px    | 16px      |
| `md`  | 40x40px    | 18px      |
| `lg`  | 48x48px    | 20px      |
| `xl`  | 64x64px    | 24px      |
| `2xl` | 80x80px    | 30px      |

## Examples in Spell-icious

### ParticipantItem Component

```tsx
<Avatar
  src={participant.emoji}
  alt={participant.name}
  size="md"
  onClick={() => setIsEditingEmoji(true)}
  showEditIcon
/>
```

### Race Lane

```tsx
<ResponsiveAvatar
  src={racer.emoji}
  alt={racer.name}
  mobileSize="sm"
  desktopSize="lg"
/>
```

### Winner Display

```tsx
<Avatar
  src={winner.emoji}
  alt={winner.name}
  size="2xl"
  className="shadow-2xl border-4 border-yellow-400"
/>
```
