import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
        './resources/js/Components/**/*.{js,ts,jsx,tsx}',
        './resources/js/Pages/**/*.{js,ts,jsx,tsx}',
        './resources/js/Layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                sidebar: {
                    DEFAULT: "var(--sidebar)",
                    foreground: "var(--sidebar-foreground)",
                    primary: "var(--sidebar-primary)",
                    "primary-foreground": "var(--sidebar-primary-foreground)",
                    accent: "var(--sidebar-accent)",
                    "accent-foreground": "var(--sidebar-accent-foreground)",
                    border: "var(--sidebar-border)",
                    ring: "var(--sidebar-ring)",
                },
                brand: {
                    DEFAULT: "var(--brand)",
                    blue: "var(--brand-blue)",
                    dark: "var(--brand-dark)",
                    darker: "var(--brand-darker)",
                    text: "var(--brand-text)",
                    soft: "var(--brand-soft)",
                    pale: "var(--brand-pale)",
                    ink: "var(--brand-ink)",
                    mint: "var(--brand-mint)",
                    panel: "var(--brand-panel)",
                    earth: "var(--brand-earth)",
                    seed: "var(--brand-seed)",
                    light: "var(--brand-light)",
                    ring: "var(--brand-ring)",
                    one: "var(--brand-one)",
                    two: "var(--brand-two)",
                    three: "var(--brand-three)",
                    four: "var(--brand-four)",
                    five: "var(--brand-five)",
                    six: "var(--brand-six)",
                    seven: "var(--brand-seven)",
                    eight: "var(--brand-eight)",
                    nine: "var(--brand-nine)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "circle-loading": {
                    "0%": { strokeDashoffset: "380" },
                    "100%": { strokeDashoffset: "0" },
                },
                "check-loading": {
                    "0%": { strokeDashoffset: "45" },
                    "100%": { strokeDashoffset: "90" },
                },
            },
            animation: {
                "circle-loading": "circle-loading 2s ease-in-out forwards",
                "check-loading": "check-loading 0.2s 2s ease-in-out forwards",
            },
        },
    },
    plugins: [
        forms, 
        require('@tailwindcss/typography')
    ],
};
