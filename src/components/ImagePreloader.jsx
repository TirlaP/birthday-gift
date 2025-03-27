import { useEffect, useCallback } from 'react';

/**
 * Simplified ImagePreloader component that just preloads images directly
 * without complex logic that can get stuck
 */
const ImagePreloader = ({ imageUrls, onProgress, onComplete }) => {
  // Function to preload a single image and return a promise
  const preloadImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false); // Still resolve on error, just mark as failed
      
      // Start loading the image
      img.src = url;
    });
  }, []);

  useEffect(() => {
    // Skip if no image URLs provided
    if (!imageUrls || imageUrls.length === 0) {
      if (onComplete) onComplete();
      return;
    }
    
    let mounted = true;
    const totalImages = imageUrls.length;
    let loadedCount = 0;
    
    // Simple approach: load all images in parallel
    const promises = imageUrls.map(url => 
      preloadImage(url).then(success => {
        if (!mounted) return;
        
        loadedCount++;
        
        // Report progress
        if (onProgress) {
          onProgress(loadedCount / totalImages);
        }
        
        // Report completion when all images are handled
        if (loadedCount === totalImages && onComplete && mounted) {
          onComplete();
        }
        
        return success;
      })
    );
    
    // Ensure completion is called even if some images fail
    Promise.all(promises).then(() => {
      if (mounted && onComplete) {
        onComplete();
      }
    });
    
    // Safety timeout to ensure we don't get stuck loading
    const safetyTimer = setTimeout(() => {
      if (mounted && onComplete) {
        console.log('Safety timeout triggered to complete loading');
        onComplete();
      }
    }, 5000); // 5 seconds max loading time
    
    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
    };
  }, [imageUrls, preloadImage, onProgress, onComplete]);
  
  // This component doesn't render anything
  return null;
};

export default ImagePreloader;