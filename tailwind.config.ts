import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        frank: ['"Frank Ruhl Libre"'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        lightBlue: '#242E44',
      },
      screens: {
        xl: { max: '1279px' },

        lg: { max: '1023px' },

        md: { max: '767px' },

        sm: { max: '639px' },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
