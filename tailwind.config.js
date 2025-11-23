export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const darkMode = ['selector', '[data-theme="dark"]'];
export const theme = {
  extend: {
    colors: {
      primary: '#2980b9',
      secondary: '#45b7a1',
      accent: '#e6b94d',
      light: '#e5e5e5',
      'background-light': '#f0f0f0',
      'background-dark': '#121212',
      'primary-light': '#333333',
      'primary-dark': '#f0f0f0',
      'secondary-light': '#666666',
      'secondary-dark': '#b0b0b0',
      'accent-light': '#333333',
      'accent-dark': '#b0b0b0',
    },
    fontFamily: {
      sketch: ['"Architects Daughter"', 'cursive'],
    },
  },
};
export const plugins = [];
