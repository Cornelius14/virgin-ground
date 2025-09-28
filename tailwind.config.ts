import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // Display sizes (for hero sections, main titles)
        'display-2xl': ['var(--display-2xl)', { lineHeight: 'var(--leading-display)' }],
        'display-xl': ['var(--display-xl)', { lineHeight: 'var(--leading-display)' }],
        'display-lg': ['var(--display-lg)', { lineHeight: 'var(--leading-display)' }],
        'display-md': ['var(--display-md)', { lineHeight: 'var(--leading-display)' }],
        'display-sm': ['var(--display-sm)', { lineHeight: 'var(--leading-display)' }],
        
        // Heading sizes (for section titles, card headers)
        'heading-h1': ['var(--heading-h1)', { lineHeight: 'var(--leading-heading)' }],
        'heading-h2': ['var(--heading-h2)', { lineHeight: 'var(--leading-heading)' }],
        'heading-h3': ['var(--heading-h3)', { lineHeight: 'var(--leading-heading)' }],
        'heading-h4': ['var(--heading-h4)', { lineHeight: 'var(--leading-heading)' }],
        'heading-h5': ['var(--heading-h5)', { lineHeight: 'var(--leading-heading)' }],
        'heading-h6': ['var(--heading-h6)', { lineHeight: 'var(--leading-heading)' }],
        
        // Body sizes (for content, descriptions)
        'body-xl': ['var(--body-xl)', { lineHeight: 'var(--leading-body)' }],
        'body-lg': ['var(--body-lg)', { lineHeight: 'var(--leading-body)' }],
        'body-base': ['var(--body-base)', { lineHeight: 'var(--leading-body)' }],
        'body-sm': ['var(--body-sm)', { lineHeight: 'var(--leading-body)' }],
        'body-xs': ['var(--body-xs)', { lineHeight: 'var(--leading-body)' }],
        
        // Caption sizes (for labels, metadata)
        'caption-lg': ['var(--caption-lg)', { lineHeight: 'var(--leading-caption)' }],
        'caption-base': ['var(--caption-base)', { lineHeight: 'var(--leading-caption)' }],
        'caption-sm': ['var(--caption-sm)', { lineHeight: 'var(--leading-caption)' }],
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--primary) / 0.5)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "glow": "glow 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
