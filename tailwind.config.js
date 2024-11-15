// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         tertiary: "#151030",
//         primary: {
//           DEFAULT: "#8D33FF",
//           foreground: "#4B336F",
//           hover: "#7E30F5",
//         },
//         accent: {
//           DEFAULT: "#1f2937",
//           foreground: "#ffffff",
//           navbar: "#573B82",
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
<<<<<<< Updated upstream
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			tertiary: '#151030',
  			primary: {
  				DEFAULT: '#8D33FF',
  				foreground: '#4B336F',
  				hover: '#7E30F5'
  			},
  			accent: {
  				DEFAULT: '#1f2937',
  				foreground: '#ffffff',
  				navbar: '#573B82'
  			}
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
=======
    extend: {
      colors: {
        background: "#6A0DAD", 
        foreground: "#ffffff",
        tertiary: "#4B0082", 
        primary: {
          DEFAULT: "#8D33FF", 
          foreground: "#4B336F", 
          hover: "#7E30F5", 
        },
        accent: {
          DEFAULT: "#1f2937", 
          foreground: "#ffffff", 
          navbar: "#573B82", 
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], 
      },
      spacing: {
        '128': '32rem', 
      },
    },
>>>>>>> Stashed changes
  },
  plugins: [require("tailwindcss-animate")],
};

