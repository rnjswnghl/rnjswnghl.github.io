
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './app*.{js,jsx,ts,tsx}',
    './components*.{js,jsx,ts,tsx}',
    './src*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#FFF1D5',
        sky: '#9EC6F3',
        water: '#BDDDE4',
        periwinkle: '#9FB3DF',
        ink: '#111827',
        mute: '#6B7280',
      },
    },
  },
  plugins: [],
};
