/**
 * Avatar Component
 * Displays user avatars - supports both custom images and emoji
 */

import { motion } from "motion/react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  src?: string;
  emoji?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
  showEditIcon?: boolean;
  fallbackIcon?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-sm",
  sm: "w-8 h-8 text-base",
  md: "w-10 h-10 text-lg",
  lg: "w-12 h-12 text-xl",
  xl: "w-16 h-16 text-2xl",
  "2xl": "w-20 h-20 text-3xl",
};

const editIconSizes: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
  "2xl": "text-lg",
};

export default function Avatar({
  src,
  emoji,
  alt = "Avatar",
  size = "md",
  className = "",
  onClick,
  showEditIcon = false,
  fallbackIcon = "👤",
}: AvatarProps) {
  const isImage = src?.startsWith("data:image/") || src?.startsWith("/");
  const isClickable = !!onClick;

  const content = (
    <>
      {isImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : emoji ? (
        <span className="flex items-center justify-center w-full h-full">
          {emoji}
        </span>
      ) : (
        <span className="flex items-center justify-center w-full h-full text-gray-400">
          {fallbackIcon}
        </span>
      )}

      {/* Edit Icon Overlay */}
      {showEditIcon && isClickable && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <span className={`text-white ${editIconSizes[size]}`}>✏️</span>
        </div>
      )}
    </>
  );

  if (isClickable) {
    return (
      <motion.button
        onClick={onClick}
        className={`relative group shrink-0 ${sizeClasses[size]} rounded-full border-2 border-orange-500 hover:border-orange-400 transition-colors overflow-hidden ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        title={showEditIcon ? "Click to change" : alt}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <div
      className={`relative shrink-0 ${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden ${className}`}
    >
      {content}
    </div>
  );
}

// Responsive Avatar variant that scales with screen size
interface ResponsiveAvatarProps extends Omit<AvatarProps, "size"> {
  mobileSize?: AvatarSize;
  tabletSize?: AvatarSize;
  desktopSize?: AvatarSize;
}

export function ResponsiveAvatar({
  mobileSize = "sm",
  tabletSize = "md",
  desktopSize = "lg",
  className = "",
  ...props
}: ResponsiveAvatarProps) {
  const responsiveClasses = `
    ${sizeClasses[mobileSize]}
    sm:${sizeClasses[tabletSize].replace("w-", "sm:w-").replace("h-", "sm:h-").replace("text-", "sm:text-")}
    md:${sizeClasses[desktopSize].replace("w-", "md:w-").replace("h-", "md:h-").replace("text-", "md:text-")}
  `;

  return (
    <Avatar
      {...props}
      className={`${responsiveClasses} ${className}`}
      size={desktopSize}
    />
  );
}

// Avatar Group - displays multiple avatars with overlap
interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    emoji?: string;
    alt?: string;
  }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function AvatarGroup({
  avatars,
  size = "md",
  max = 5,
  className = "",
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  return (
    <div className={`flex items-center ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="-ml-2 first:ml-0"
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            emoji={avatar.emoji}
            alt={avatar.alt}
            size={size}
            className="ring-2 ring-white dark:ring-gray-900"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`-ml-2 ${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold`}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
