import { useEffect } from 'react';

// Component to preload images in the background
const ImagePreloader = ({ imageUrls }) => {
  useEffect(() => {
    // Skip if no image URLs provided
    if (!imageUrls || imageUrls.length === 0) return;
    
    // Create an array to track the loading images
    const imageElements = [];
    
    // Preload each image
    imageUrls.forEach(url => {
      if (!url) return; // Skip empty URLs
      
      const img = new Image();
      img.src = url;
      imageElements.push(img);
    });
    
    // Cleanup function to remove references
    return () => {
      imageElements.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);
  
  // This component doesn't render anything
  return null;
};

export default ImagePreloader;