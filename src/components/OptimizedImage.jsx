import { useState, useEffect, memo } from 'react';

/**
 * OptimizedImage component for better image loading with webp support
 * Memoized to prevent unnecessary re-renders
 */
const OptimizedImage = memo(({ src, alt, className, style, loading = 'lazy', onLoad, onError }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Reset loaded state when src changes
    setLoaded(false);
  }, [src]);

  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    if (onError) onError(e);
  };

  // For WebP images, use directly without picture element
  // This simplifies the approach and avoids potential browser compatibility issues
  return (
    <img
      src={src} 
      alt={alt || 'Image'}
      className={`${className || ''} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transition: 'opacity 300ms ease-in-out',
        ...style
      }}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
    />
  );
});

// Display name for debugging
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;