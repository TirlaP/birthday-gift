/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        spin: 'spin 3s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      zIndex: {
        '-10': '-10',
        '-5': '-5',
      }
    },
  },
  safelist: [
    // Box gradients
    'from-pink-500', 'to-rose-500',
    'from-blue-500', 'to-cyan-500',
    'from-purple-500', 'to-indigo-500',
    'from-amber-500', 'to-orange-500',
    'from-emerald-500', 'to-teal-500',
    'from-red-500', 'to-rose-500',
    'from-violet-500', 'to-purple-500',
    'from-yellow-500', 'to-amber-500',
    
    // Lid colors
    'from-pink-400', 'to-rose-400',
    'from-blue-400', 'to-cyan-400',
    'from-purple-400', 'to-indigo-400',
    'from-amber-400', 'to-orange-400',
    'from-emerald-400', 'to-teal-400',
    'from-red-400', 'to-rose-400',
    'from-violet-400', 'to-purple-400',
    'from-yellow-400', 'to-amber-400',
    
    // Ribbon colors
    'from-pink-700', 'to-rose-700',
    'from-blue-700', 'to-cyan-700',
    'from-purple-700', 'to-indigo-700',
    'from-amber-700', 'to-orange-700',
    'from-emerald-700', 'to-teal-700',
    'from-red-700', 'to-rose-700',
    'from-violet-700', 'to-purple-700',
    'from-yellow-700', 'to-amber-700',
    
    // Background colors for confetti and bubbles
    'bg-pink-500', 'bg-blue-500', 'bg-green-500', 
    'bg-yellow-400', 'bg-purple-500', 'bg-red-500',
    'bg-violet-500', 'bg-amber-500', 'bg-teal-500',
    'bg-indigo-500', 'bg-rose-500'
  ],
  plugins: [],
}