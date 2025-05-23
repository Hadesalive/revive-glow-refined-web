
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#7A9B57', // Natural green from logo
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#F8F5F0', // Cream background
					foreground: '#2D3748'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#F7FAFC',
					foreground: '#718096'
				},
				accent: {
					DEFAULT: '#FF6B35', // Orange accent from logo
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Brand colors from logo
				brand: {
					green: {
						50: '#F0F9E8',
						100: '#D9F0C4',
						200: '#B8E394',
						300: '#94D564',
						400: '#7A9B57',
						500: '#6B8E23', // Primary green
						600: '#5A7A1E',
						700: '#4A6519',
						800: '#3A5014',
						900: '#2A3B0F',
					},
					orange: {
						50: '#FFF4E6',
						100: '#FFE0B3',
						200: '#FFCC80',
						300: '#FFB74D',
						400: '#FFA726',
						500: '#FF6B35', // Primary orange
						600: '#F57C00',
						700: '#EF6C00',
						800: '#E65100',
						900: '#BF360C',
					}
				},
				cream: "#F8F5F0",
				sage: {
					50: "#F4F6F2",
					100: "#E9ECE4",
					200: "#D1D5C8",
					300: "#B9C0AD",
					400: "#A1AB91",
					500: "#7A9B57", // Updated to match brand green
					600: "#6B8E23",
					700: "#555F46",
					800: "#3A3F30",
					900: "#1E2018",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"fade-out": {
					"0%": {
						opacity: "1",
						transform: "translateY(0)"
					},
					"100%": {
						opacity: "0",
						transform: "translateY(10px)"
					}
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
