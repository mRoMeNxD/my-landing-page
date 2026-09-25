export interface SocialLinkItem {
  name: string;
  handle?: string;
  url: string;
  icon: "telegram" | "instagram" | "github" | "x" | "discord" | "youtube";
}

export interface TVGridConfig {
  enabled: boolean;
  intensity: "subtle" | "medium" | "strong" | "off";
  scanlines: {
    enabled: boolean;
    opacity: number;
    spacing: number;
  };
  grille: {
    enabled: boolean;
    opacity: number;
    spacing: number;
  };
  subpixel: {
    enabled: boolean;
    opacity: number;
  };
  vignette: {
    enabled: boolean;
    opacity: number;
  };
  grain: {
    enabled: boolean;
    opacity: number;
  };
  motion: {
    enabled: boolean;
    speed: "slow" | "medium" | "off";
  };
}

export interface ProfileConfig {
  name: string;
  handle: string;
  bio: string;
  location?: string;
  statusBadge?: string;
  profileImage: string;
  background: {
    type: "image" | "video";
    src: string;
    fallbackImage?: string;
    colorGrading?: {
      contrast: number;
      brightness: number;
      saturation: number;
      opacity: number;
    };
  };
  cursor: {
    enabled: boolean;
    src: string;
    size: number;
  };
  tvGrid: TVGridConfig;
  accent: string;
  socials: SocialLinkItem[];
}

export const defaultProfile: ProfileConfig = {
  name: "Niteen",
  handle: "@mR_oMeNxD",
  bio: "digital creator · developer",
  location: "Earth",
  statusBadge: "Available for collaboration",
  profileImage: "/assets/profile.jpg",
  background: {
    type: "image",
    src: "/assets/background.webp",
    colorGrading: {
      contrast: 1.04,
      brightness: 0.96,
      saturation: 0.92,
      opacity: 1,
    },
  },
  cursor: {
    enabled: true,
    src: "/assets/cursor.svg",
    size: 28,
  },
  tvGrid: {
    enabled: false,
    intensity: "off",
    scanlines: {
      enabled: true,
      opacity: 0.12,
      spacing: 3,
    },
    grille: {
      enabled: true,
      opacity: 0.08,
      spacing: 2,
    },
    subpixel: {
      enabled: true,
      opacity: 0.025,
    },
    vignette: {
      enabled: true,
      opacity: 0.22,
    },
    grain: {
      enabled: true,
      opacity: 0.03,
    },
    motion: {
      enabled: true,
      speed: "slow",
    },
  },
  accent: "#56685B", // Muted earth moss / sage olive
  socials: [
    {
      name: "Instagram",
      handle: "ziteenn",
      url: "https://instagram.com/ziteenn",
      icon: "instagram",
    },
    {
      name: "GitHub",
      handle: "mR_oMeNxD",
      url: "https://github.com/mR_oMeNxD",
      icon: "github",
    },
    {
      name: "Telegram",
      handle: "@ziteen",
      url: "https://t.me/ziteen",
      icon: "telegram",
    },
  ],
};
