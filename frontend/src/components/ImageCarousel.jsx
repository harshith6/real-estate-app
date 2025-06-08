import React, { useState, useEffect, useRef } from 'react';

const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const carouselRef = useRef(null);

  // Preload images to check validity
  useEffect(() => {
    const validUrls = [];
    let mounted = true;

    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => {
          console.error('Failed to load image:', url);
          resolve(false);
        };
        img.src = url;
      });
    };

    const validateImages = async () => {
      setLoading(true);
      setError('');
      try {
        for (const url of images) {
          if (!mounted) break;
          if (url && typeof url === 'string' && url.trim() !== '') {
            const isValid = await checkImage(url);
            if (isValid && mounted) {
              validUrls.push(url);
            }
          }
        }
        if (mounted) {
          if (validUrls.length === 0) {
            setError('No valid images available');
          }
          setLoadedImages(validUrls);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error validating images:', err);
        if (mounted) {
          setError('Failed to load images');
          setLoading(false);
        }
      }
    };

    validateImages();
    return () => { mounted = false; };
  }, [images]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === carouselRef.current) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleZoom();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-advance slides every 5 seconds if there are multiple images and not zoomed
  useEffect(() => {
    if (loadedImages.length <= 1 || isZoomed) return;
    
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [loadedImages.length, isZoomed]);

  const goToNext = () => {
    if (loadedImages.length <= 1 || isZoomed) return;
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 === loadedImages.length ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    if (loadedImages.length <= 1 || isZoomed) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? loadedImages.length - 1 : prevIndex - 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance for swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 min-h-[200px] rounded-lg backdrop-blur-sm">
        <div className="text-center text-gray-400">
          <div className="relative w-8 h-8 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <span className="block mt-2 font-medium">Loading gallery...</span>
        </div>
      </div>
    );
  }

  if (error || loadedImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 min-h-[200px] rounded-lg backdrop-blur-sm">
        <div className="text-center p-4">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="block mt-2 text-gray-400 font-medium">{error || 'No images available'}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full min-h-[200px] max-h-[500px] group focus:outline-none"
      tabIndex="0"
      role="region"
      aria-label={`${title} image gallery`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image Container */}
      <div 
        className={`relative w-full h-full overflow-hidden rounded-lg ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={toggleZoom}
      >
        <img
          src={loadedImages[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className={`w-full h-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Navigation Controls - Only show if there's more than one image and not zoomed */}
      {loadedImages.length > 1 && !isZoomed && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium z-10 backdrop-blur-sm">
            {currentIndex + 1} / {loadedImages.length}
          </div>

          {/* Image Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
            {loadedImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
