export const colors = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  destructive: "var(--destructive)",
  destructiveForeground: "var(--destructive-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  sidebar: "var(--sidebar)",
  sidebarForeground: "var(--sidebar-foreground)",
  sidebarPrimary: "var(--sidebar-primary)",
  sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
  sidebarAccent: "var(--sidebar-accent)",
  sidebarAccentForeground: "var(--sidebar-accent-foreground)",
  sidebarBorder: "var(--sidebar-border)",
  sidebarRing: "var(--sidebar-ring)",
  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",
  brand: {
    olive: "var(--brand)",
    oliveOne: "var(--brand-one)",
    oliveTwo: "var(--brand-two)",
    oliveThree: "var(--brand-three)",
    oliveFour: "var(--brand-four)",
    oliveFive: "var(--brand-five)",
    oliveSix: "var(--brand-six)",
    oliveSeven: "var(--brand-seven)",
    oliveEight: "var(--brand-eight)",
    oliveNine: "var(--brand-nine)",
    oliveLight: "var(--brand-light)",
    oliveDark: "var(--brand-dark)",
    oliveText: "var(--brand-text)",
    oliveSoft: "var(--brand-soft)",
    olivePale: "var(--brand-pale)",
    oliveInk: "var(--brand-ink)",
    oliveMint: "var(--brand-mint)",
    olivePanel: "var(--brand-panel)",
    oliveEarth: "var(--brand-earth)",
    oliveRing: "var(--brand-ring)",
  },
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

export const radius = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "0.75rem",
  pill: "9999px",
} as const;

export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const;

export const typography = {
  size: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
} as const;

export const transitions = {
  fast: "transition duration-150 ease-in-out",
  normal: "transition duration-300",
} as const;

export type DesignTokens = {
  colors: typeof colors;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  typography: typeof typography;
  transitions: typeof transitions;
};
