import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftBox from './components/GiftBox'
import GiftReveal from './components/GiftReveal'
import Confetti from './components/Confetti'
import ImagePreloader from './components/ImagePreloader'
import './App.css'

// Lazy load background components to improve initial load time
const BackgroundEffects = lazy(() => import('./components/BackgroundEffects'));
const FloatingElements = lazy(() => import('./components/FloatingElements'));

const gifts = [
  {
    id: 1,
    name: "New Camera",
    image: "/images/gift1.jpg", // Empty link for you to fill
    description: "I got you that Canon camera you've been wanting! It's still being shipped, but it will arrive next week.",
    colors: {
      box: "from-pink-500 to-rose-500",
      lid: "from-pink-400 to-rose-400",
      ribbon: "from-pink-700 to-rose-700"
    }
  },
  {
    id: 2,
    name: "Spa Day",
    image: "/images/gift2.jpg", // Empty link for you to fill
    description: "A full day at the spa with all treatments included. You deserve some relaxation!",
    colors: {
      box: "from-blue-500 to-cyan-500",
      lid: "from-blue-400 to-cyan-400",
      ribbon: "from-blue-700 to-cyan-700"
    }
  },
  {
    id: 3,
    name: "Concert Tickets",
    image: "/images/gift3.jpg", // Empty link for you to fill
    description: "Two tickets to see your favorite band next month! I'll be your plus one if you want 😉",
    colors: {
      box: "from-purple-500 to-indigo-500",
      lid: "from-purple-400 to-indigo-400",
      ribbon: "from-purple-700 to-indigo-700"
    }
  },
  {
    id: 4,
    name: "Weekend Getaway",
    image: "/images/gift4.jpg", // Empty link for you to fill
    description: "A weekend trip to that cute B&B by the beach you've been talking about!",
    colors: {
      box: "from-amber-500 to-orange-500",
      lid: "from-amber-400 to-orange-400",
      ribbon: "from-amber-700 to-orange-700"
    }
  },
  {
    id: 5,
    name: "Art Supplies",
    image: "/images/gift5.jpg", // Empty link for you to fill
    description: "A complete set of professional art supplies for your new painting hobby!",
    colors: {
      box: "from-emerald-500 to-teal-500",
      lid: "from-emerald-400 to-teal-400",
      ribbon: "from-emerald-700 to-teal-700"
    }
  },
  {
    id: 6,
    name: "Mystery Gift",
    image: "/images/gift6.jpg", // Empty link for you to fill
    description: "This one is a real surprise! You'll have to wait until it arrives to find out what it is...",
    colors: {
      box: "from-red-500 to-rose-500",
      lid: "from-red-400 to-rose-400",
      ribbon: "from-red-700 to-rose-700"
    }
  },
  {
    id: 7,
    name: "Photo Book",
    image: "/images/gift7.jpg", // Empty link for you to fill
    description: "A custom photo album with all our best memories together. It's a trip down memory lane!",
    colors: {
      box: "from-violet-500 to-purple-500",
      lid: "from-violet-400 to-purple-400",
      ribbon: "from-violet-700 to-purple-700"
    }
  },
  {
    id: 8,
    name: "Jewelry",
    image: "/images/gift8.jpg", // Empty link for you to fill
    description: "That beautiful necklace you've been eyeing. It'll look perfect on you!",
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

  // Extract all image URLs for preloading
  const imageUrls = gifts.map(gift => gift.image);

  // Track when images are loaded
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };
    
    // Create Image objects to track loading
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Count errors as "loaded" to avoid hanging
      img.src = url;
    });
    
    // If there are no images, consider them loaded
    if (totalImages === 0) {
      setImagesLoaded(true);
    }
    
    return () => {
      // Cleanup
      setImagesLoaded(false);
    };
  }, [imageUrls]);

  const handleOpenGift = (gift) => {
    setSelectedGift(gift);
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts([...openedGifts, gift.id]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const closeGiftReveal = () => {
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Preload all gift images */}
      <ImagePreloader imageUrls={imageUrls} />
      
      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-600 font-medium">Loading your gifts...</p>
          </div>
        </div>
      )}
      
      {/* Background blur gradients (bottom layer) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 opacity-50 blur-xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 opacity-50 blur-xl"></div>
      </div>
      
      {/* Lazy loaded background components */}
      <Suspense fallback={null}>
        {/* Subtle background effects (layer 1) */}
        <BackgroundEffects />
        
        {/* Floating balloons and gifts (layer 5) */}
        <FloatingElements />
      </Suspense>

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
                scale: openedGifts.length === gifts.length ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.5, 
                repeat: openedGifts.length === gifts.length ? Infinity : 0,
                repeatDelay: 1
              }}
            >
              Gifts Discovered: {openedGifts.length} of {gifts.length}
              {openedGifts.length === gifts.length && " 🎊"}
            </motion.p>
          </div>
        </header>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {gifts.map((gift) => (
            <GiftBox 
              key={gift.id}
              gift={gift}
              isOpened={openedGifts.includes(gift.id)}
              onClick={() => handleOpenGift(gift)}
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