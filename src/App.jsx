import { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftBox from './components/GiftBox'
import GiftReveal from './components/GiftReveal'
import Confetti from './components/Confetti'
import ImagePreloader from './components/ImagePreloader'
import './App.css'

// Lazy load background components to improve initial load time
const BackgroundEffects = lazy(() => import('./components/BackgroundEffects'));
const FloatingElements = lazy(() => import('./components/FloatingElements'));

// Define gifts array outside the component to prevent recreation on re-renders
const gifts = [
  {
    id: 1,
    name: "Elegant Gold Snake Ring Collection",
    image: "/images/gift1.webp", 
    description: "A stunning collection of gold rings featuring intricate snake designs and beautiful emerald accents. Perfect for making a bold fashion statement!",
    colors: {
      box: "from-pink-500 to-rose-500",
      lid: "from-pink-400 to-rose-400",
      ribbon: "from-pink-700 to-rose-700"
    }
  },
  {
    id: 2,
    name: "Vintage Self-Care Wall Art",
    image: "/images/gift2.webp",
    description: "A stylish vintage-inspired metal sign with the empowering message 'And She Lived Happily Ever After' - perfect for your bedroom or bathroom wall!",
    colors: {
      box: "from-blue-500 to-cyan-500",
      lid: "from-blue-400 to-cyan-400",
      ribbon: "from-blue-700 to-cyan-700"
    }
  },
  {
    id: 3,
    name: "Retro Kitchen Wall Decor",
    image: "/images/gift3.webp",
    description: "A fun and quirky vintage-style kitchen sign with a humorous twist - 'Don't Make Me Poison Your Food'. Perfect for your kitchen wall!",
    colors: {
      box: "from-purple-500 to-indigo-500",
      lid: "from-purple-400 to-indigo-400",
      ribbon: "from-purple-700 to-indigo-700"
    }
  },
  {
    id: 4,
    name: "Sassy Statement Tank Top",
    image: "/images/gift4.webp",
    description: "A bold black tank top with the empowering message 'I Only Accept Apologies in Cash' - perfect for casual outings or making a statement!",
    colors: {
      box: "from-amber-500 to-orange-500",
      lid: "from-amber-400 to-orange-400",
      ribbon: "from-amber-700 to-orange-700"
    }
  },
  {
    id: 5,
    name: "Mini Red Shoulder Bag",
    image: "/images/gift5.webp",
    description: "A chic burgundy mini shoulder bag with gold hardware, perfect for carrying your essentials while adding a pop of color to any outfit!",
    colors: {
      box: "from-emerald-500 to-teal-500",
      lid: "from-emerald-400 to-teal-400",
      ribbon: "from-emerald-700 to-teal-700"
    }
  },
  {
    id: 6,
    name: "Elegant Black Evening Dress",
    image: "/images/gift6.webp",
    description: "A stunning black strapless bodycon dress with ruched detailing and side slit - perfect for special occasions and nights out!",
    colors: {
      box: "from-red-500 to-rose-500",
      lid: "from-red-400 to-rose-400",
      ribbon: "from-red-700 to-rose-700"
    }
  },
  {
    id: 7,
    name: "Luxurious Lace Lingerie Set",
    image: "/images/gift7.webp",
    description: "An elegant black and white floral lace lingerie set with pearl strap details and corset-style front - beautiful and sophisticated!",
    colors: {
      box: "from-violet-500 to-purple-500",
      lid: "from-violet-400 to-purple-400",
      ribbon: "from-violet-700 to-purple-700"
    }
  },
  {
    id: 8,
    name: "Designer Red-Bottom Heels",
    image: "/images/gift8.webp",
    description: "Classic black patent leather stiletto pumps with the iconic red bottom - timeless, elegant, and perfect for making a statement!",
    colors: {
      box: "from-yellow-500 to-amber-500",
      lid: "from-yellow-400 to-amber-400",
      ribbon: "from-yellow-700 to-amber-700"
    }
  }
];

function App() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [openedGifts, setOpenedGifts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Extract all image URLs for preloading - memoized to prevent recalculation on rerenders
  const imageUrls = useMemo(() => gifts.map(gift => gift.image), []);

  // Force loading to complete after 5 seconds even if images aren't all loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imagesLoaded) {
        console.log('Forcing loading completion after timeout');
        setImagesLoaded(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [imagesLoaded]);

  // Memoized handlers to prevent rerenders
  const handleImageLoadProgress = useCallback((progress) => {
    setLoadingProgress(progress);
  }, []);
  
  const handleImageLoadComplete = useCallback(() => {
    console.log('All images preloaded successfully');
    setImagesLoaded(true);
  }, []);

  const handleOpenGift = useCallback((gift) => {
    setSelectedGift(gift);
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts(prevOpenedGifts => [...prevOpenedGifts, gift.id]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [openedGifts]);

  const closeGiftReveal = useCallback(() => {
    setSelectedGift(null);
  }, []);

  // Memoized computation for if all gifts are opened
  const allGiftsOpened = useMemo(() => 
    openedGifts.length === gifts.length, 
    [openedGifts.length]
  );

  // Animation variants - defined outside render to prevent recreation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Preload all gift images with progress tracking */}
      <ImagePreloader 
        imageUrls={imageUrls}
        onProgress={handleImageLoadProgress}
        onComplete={handleImageLoadComplete}
      />
      
      {/* Loading indicator with progress */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-center max-w-xs w-full px-6">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-600 font-medium mb-2">Loading your gifts...</p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, Math.round(loadingProgress * 100))}%` }}
              ></div>
            </div>
            <p className="text-gray-500 text-xs">{Math.round(loadingProgress * 100)}% complete</p>
          </div>
        </div>
      )}
      
      {/* Background blur gradients (bottom layer) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 opacity-50 blur-xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 opacity-50 blur-xl"></div>
      </div>
      
      {/* Lazy loaded background components */}
      {imagesLoaded && (
        <Suspense fallback={null}>
          {/* Subtle background effects (layer 1) */}
          <BackgroundEffects />
          
          {/* Floating balloons and gifts (layer 5) */}
          <FloatingElements />
        </Suspense>
      )}

      {/* Confetti when opening gifts (top layer) */}
      {showConfetti && <Confetti />}
      
      {/* Gift reveal modal */}
      <AnimatePresence>
        {selectedGift && (
          <GiftReveal gift={selectedGift} onClose={closeGiftReveal} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <header className="text-center mb-8 md:mb-12 relative">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 relative"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ 
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text'
            }}
          >
            Happy Birthday, Sis! 
            <motion.span 
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, 0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🎉
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-5"
            animate={{ 
              width: ['8rem', '10rem', '8rem'],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.p 
            className="text-base sm:text-lg text-gray-700 max-w-lg mx-auto"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Your gifts are on the way, but in the meantime, click on these boxes to see what's coming!
          </motion.p>
          
          {/* Gift counter */}
          <div className="text-center mt-4 mb-2">
            <motion.p 
              className="text-purple-700 font-medium"
              animate={{ 
                scale: allGiftsOpened ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.5, 
                repeat: allGiftsOpened ? Infinity : 0,
                repeatDelay: 1
              }}
            >
              Gifts Discovered: {openedGifts.length} of {gifts.length}
              {allGiftsOpened && " 🎊"}
            </motion.p>
          </div>
        </header>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {gifts.map((gift) => (
            <GiftBox 
              key={gift.id}
              gift={gift}
              isOpened={openedGifts.includes(gift.id)}
              onClick={handleOpenGift}
            />
          ))}
        </motion.div>
        
        <div className="mt-10 md:mt-16 text-center text-gray-500 text-sm">
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Made with ❤️ for my awesome sister
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default App