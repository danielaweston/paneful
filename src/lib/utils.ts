import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PaneSizeVariant = {
  label: string;
  type: "mobile" | "tablet" | "laptop" | "television" | "tailwind";
  width: number;
  height: number;
};

export type PaneSizeVariants = Record<string, PaneSizeVariant>;

// https://searchfox.org/mozilla-central/source/services/settings/dumps/main/devtools-devices.json
export const PANE_SIZE_VARIANTS: PaneSizeVariants = {
  IPHONE_14_PRO_MAX: {
    label: "iPhone 14 Pro Max",
    type: "mobile",
    width: 430,
    height: 932,
  },
  IPHONE_12_13_MINI: {
    label: "iPhone 12/13 Mini",
    type: "mobile",
    width: 375,
    height: 812,
  },
  IPHONE_12_13_PRO: {
    label: "iPhone 12/13 + Pro",
    type: "mobile",
    width: 390,
    height: 844,
  },
  IPHONE_12_13_PRO_MAX: {
    label: "iPhone 12/13 Pro Max",
    type: "mobile",
    width: 428,
    height: 926,
  },
  IPHONE_11_PRO_MAX: {
    label: "iPhone 11 Pro Max",
    type: "mobile",
    width: 414,
    height: 896,
  },
  IPHONE_11_PRO: {
    label: "iPhone 11 Pro",
    type: "mobile",
    width: 375,
    height: 812,
  },
  IPHONE_11_XR: {
    label: "iPhone XR/11",
    type: "mobile",
    width: 414,
    height: 896,
  },
  IPHONE_SE: {
    label: "iPhone SE 2nd Gen",
    type: "mobile",
    width: 375,
    height: 667,
  },
  IPHONE_XS_MAX: {
    label: "iPhone XS Max",
    type: "mobile",
    width: 414,
    height: 896,
  },
  IPHONE_X_XS: {
    label: "iPhone X/XS",
    type: "mobile",
    width: 375,
    height: 812,
  },
  IPHONE_6_7_8_PLUS: {
    label: "iPhone 6/7/8 Plus",
    type: "mobile",
    width: 414,
    height: 736,
  },
  IPHONE_6_7_8: {
    label: "iPhone 6/7/8",
    type: "mobile",
    width: 375,
    height: 667,
  },
  IPHONE_5_SE: {
    label: "iPhone 5/SE",
    type: "mobile",
    width: 320,
    height: 568,
  },
  IPAD_PRO_11: {
    label: "iPad Pro (11-inch)",
    type: "tablet",
    width: 834,
    height: 1194,
  },
  IPAD_PRO_13: {
    label: "iPad Pro (12.9-inch)",
    type: "tablet",
    width: 1024,
    height: 1366,
  },
  IPAD_AIR: {
    label: "iPad Air",
    type: "tablet",
    width: 820,
    height: 1180,
  },
  IPAD_MINI: {
    label: "iPad Mini",
    type: "tablet",
    width: 1024,
    height: 768,
  },
  IPAD: {
    label: "iPad",
    type: "tablet",
    width: 810,
    height: 1080,
  },
  MACBOOK_AIR_13: {
    label: 'MacBook Air 13"',
    type: "laptop",
    width: 1440,
    height: 900,
  },
  LAPTOP_MDPI: {
    label: "Laptop w/ MDPI Screen",
    type: "laptop",
    width: 1280,
    height: 800,
  },
  LAPTOP_HIDPI: {
    label: "Laptop w/ HiDPI Screen",
    type: "laptop",
    width: 1440,
    height: 900,
  },
  GALAXY_S20_ULTRA: {
    label: "Galaxy S20 Ultra",
    type: "mobile",
    width: 412,
    height: 915,
  },
  GALAXY_S20_PLUS: {
    label: "Galaxy S20+",
    type: "mobile",
    width: 384,
    height: 854,
  },
  GALAXY_S20: {
    label: "Galaxy S20",
    type: "mobile",
    width: 360,
    height: 800,
  },
  GALAXY_S10: {
    label: "Galaxy S10/S10+",
    type: "mobile",
    width: 360,
    height: 760,
  },
  GALAXY_S9: {
    label: "Galaxy S9/S9+",
    type: "mobile",
    width: 360,
    height: 740,
  },
  GALAXY_S5: {
    label: "Galaxy S5",
    type: "mobile",
    width: 360,
    height: 640,
  },
  GALAXY_NOTE_20_ULTRA: {
    label: "Galaxy Note 20 Ultra",
    type: "mobile",
    width: 412,
    height: 883,
  },
  GALAXY_NOTE_20: {
    label: "Galaxy Note 20",
    type: "mobile",
    width: 412,
    height: 915,
  },
  GALAX_NOTE_9: {
    label: "Galaxy Note 9",
    type: "mobile",
    width: 414,
    height: 846,
  },
  GALAXY_NOTE_3: {
    label: "Galaxy Note 3",
    type: "mobile",
    width: 360,
    height: 640,
  },
  PIXEL_5: {
    label: "Pixel 5",
    type: "mobile",
    width: 393,
    height: 851,
  },
  PIXEL_2_XL: {
    label: "Pixel 2 XL",
    type: "mobile",
    width: 411,
    height: 823,
  },
  PIXEL_2: {
    label: "Pixel 2",
    type: "mobile",
    width: 411,
    height: 731,
  },
  NEXUS_10: {
    label: "Nexus 10",
    type: "tablet",
    width: 800,
    height: 1280,
  },
  NEXUS_7: {
    label: "Nexus 7",
    type: "tablet",
    width: 600,
    height: 960,
  },
  NEXUS_6P: {
    label: "Nexus 6P",
    type: "mobile",
    width: 412,
    height: 732,
  },
  NEXUS_5X: {
    label: "Nexus 5X",
    type: "mobile",
    width: 412,
    height: 732,
  },
  TV_720P: {
    label: "720p HD Television",
    type: "television",
    width: 1280,
    height: 720,
  },
  HD_TV_1080: {
    label: "1080p Full HD Television",
    type: "television",
    width: 1920,
    height: 1080,
  },
  ULTRA_HD_TV_4K: {
    label: "4K Ultra HD Television",
    type: "television",
    width: 3840,
    height: 2160,
  },
  TAILWIND_SMALLEST: {
    label: "Tailwind < SM",
    type: "tailwind",
    width: 360,
    height: 800,
  },
  TAILWIND_SM: {
    label: "Tailwind SM",
    type: "tailwind",
    width: 640,
    height: 800,
  },
  TAILWIND_MD: {
    label: "Tailwind MD",
    type: "tailwind",
    width: 768,
    height: 800,
  },
  TAILWIND_LG: {
    label: "Tailwind LG",
    type: "tailwind",
    width: 1024,
    height: 800,
  },
  TAILWIND_XL: {
    label: "Tailwind XL",
    type: "tailwind",
    width: 1280,
    height: 900,
  },
  TAILWIND_2XL: {
    label: "Tailwind 2XL",
    type: "tailwind",
    width: 1536,
    height: 900,
  },
};

export const PANE_TOOLBAR_HEIGHT = 30;
export const PANE_TOOLBAR_HEIGHT_TAILWIND_CLASS = "h-[30px]";
export const PANE_BORDER_WIDTH = 2;
export const PANE_BORDER_TAILWIND_CLASS = "border-2";

export const CANVAS_STATE_DEFAULT = {
  x: 30,
  y: 120,
  scale: 0.5,
  isDisabled: false,
  sourceUrl: "",
  panes: [
    {
      id: crypto.randomUUID(),
      width: PANE_SIZE_VARIANTS.IPHONE_14_PRO_MAX!.width,
      height: PANE_SIZE_VARIANTS.IPHONE_14_PRO_MAX!.height,
      preMinimizedHeight: PANE_SIZE_VARIANTS.IPHONE_14_PRO_MAX!.height,
      paneSizeVariant: "IPHONE_14_PRO_MAX",
      x: 0,
      y: 0,
      z: 0,
      isLocked: false,
      isMoving: false,
      isResizing: false,
      isMinimized: false,
    },
    {
      id: crypto.randomUUID(),
      width: PANE_SIZE_VARIANTS.IPHONE_5_SE!.width,
      height: PANE_SIZE_VARIANTS.IPHONE_5_SE!.height,
      preMinimizedHeight: PANE_SIZE_VARIANTS.IPHONE_5_SE!.height,
      paneSizeVariant: "IPHONE_5_SE",
      x: 70,
      y: 972,
      z: 0,
      isLocked: false,
      isMoving: false,
      isResizing: false,
      isMinimized: false,
    },
    {
      id: crypto.randomUUID(),
      width: PANE_SIZE_VARIANTS.IPAD_MINI!.width,
      height: PANE_SIZE_VARIANTS.IPAD_MINI!.height,
      preMinimizedHeight: PANE_SIZE_VARIANTS.IPAD_MINI!.height,
      paneSizeVariant: "IPAD_MINI",
      x: 440,
      y: 0,
      z: 0,
      isLocked: false,
      isMoving: false,
      isResizing: false,
      isMinimized: false,
    },
    {
      id: crypto.randomUUID(),
      width: PANE_SIZE_VARIANTS.LAPTOP_HIDPI!.width,
      height: PANE_SIZE_VARIANTS.LAPTOP_HIDPI!.height,
      preMinimizedHeight: PANE_SIZE_VARIANTS.LAPTOP_HIDPI!.height,
      paneSizeVariant: "LAPTOP_HIDPI",
      x: 440,
      y: 808,
      z: 0,
      isLocked: false,
      isMoving: false,
      isResizing: false,
      isMinimized: false,
    },
  ],
};
