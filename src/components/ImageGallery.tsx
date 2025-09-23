import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from 'lucide-react';
import { ProjectImage } from '../types/portfolio';

interface ImageGalleryProps {
  images: ProjectImage[];
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = '',
  showThumbnails = true,
  autoPlay = false,
  autoPlayDelay = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Start at 100% (normal), toggle to 200%
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [uiTimeout, setUiTimeout] = useState<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isFullscreen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, images.length, isFullscreen]);

  const resetZoomAndPan = useCallback(() => {
    // Reset to normal zoom and center pan
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setHasDragged(false);
  }, []);

  // Auto-hide UI controls after 2 seconds of inactivity
  const resetUITimer = useCallback(() => {
    if (uiTimeout) {
      clearTimeout(uiTimeout);
    }
    setShowUI(true);
    
    const newTimeout = setTimeout(() => {
      setShowUI(false);
    }, 2000);
    
    setUiTimeout(newTimeout);
  }, [uiTimeout]);

  const showUITemporarily = useCallback(() => {
    setShowUI(true);
    resetUITimer();
  }, [resetUITimer]);

  const navigateToImage = useCallback((index: number) => {
    if (index < 0) {
      setCurrentIndex(images.length - 1);
    } else if (index >= images.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
    // Reset zoom and pan when changing images
    resetZoomAndPan();
  }, [images.length, resetZoomAndPan]);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
    resetZoomAndPan(); // Reset zoom and pan when closing fullscreen
    if (uiTimeout) {
      clearTimeout(uiTimeout);
      setUiTimeout(null);
    }
    setShowUI(true);
  }, [resetZoomAndPan, uiTimeout]);

  // Lock body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on component unmount
    return () => {
      if (isFullscreen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    };
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          navigateToImage(currentIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateToImage(currentIndex + 1);
          break;
        case 'Escape':
          e.preventDefault();
          handleCloseFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen, navigateToImage, handleCloseFullscreen]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
    resetZoomAndPan(); // Start at normal zoom when opening fullscreen
    resetUITimer(); // Start UI timer when opening fullscreen
  };

  // Toggle between 100% and 200% zoom on click (but not after dragging)
  const handleFullscreenImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Show UI on any interaction
    showUITemporarily();
    
    // Only toggle zoom if the user didn't drag (was a simple click)
    if (!hasDragged) {
      if (zoomLevel === 1) {
        // Zoom in to 200%
        setZoomLevel(2);
      } else {
        // Zoom out to 100% and reset pan
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      }
    }
    
    // Reset drag state for next interaction
    setHasDragged(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Reset drag state at start of new interaction
    setHasDragged(false);
    
    // Show UI on interaction
    showUITemporarily();
    
    // Only allow dragging when zoomed in (200%)
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
      e.preventDefault(); // Prevent image selection/drag
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      // Mark that user has dragged (moved the mouse while holding down)
      setHasDragged(true);
      
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setHasDragged(false);
    
    // Show UI on touch interaction
    showUITemporarily();
    
    if (zoomLevel > 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoomLevel > 1) {
      setHasDragged(true);
      const touch = e.touches[0];
      
      setPanPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Remove wheel zoom - keep at 200% zoom always
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // No zoom change - wheel events prevented
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex].url;
    link.download = `workflow-image-${currentIndex + 1}.png`;
    link.click();
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div 
        className="relative bg-gray-900 rounded-lg overflow-hidden group cursor-zoom-in"
        onClick={handleImageClick}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
            </div>
          )}
          
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].altText}
            className="w-full h-auto max-h-96 object-contain cursor-zoom-in"
            onLoad={handleImageLoad}
            onLoadStart={() => setIsLoading(true)}
            onClick={handleImageClick}
          />

          {/* Zoom Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 pointer-events-none">
            <ZoomIn className="w-12 h-12 text-white" />
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pointer-events-none">
              <p className="text-white text-sm">{images[currentIndex].caption}</p>
            </div>
          )}
        </motion.div>

        {/* Navigation Arrows (only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateToImage(currentIndex - 1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-auto z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateToImage(currentIndex + 1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-auto z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm pointer-events-none z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-emerald-400 ring-2 ring-emerald-400 ring-opacity-50'
                  : 'border-gray-300 hover:border-emerald-300'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.altText}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center"
            onClick={handleCloseFullscreen}
            style={{ touchAction: 'none' }}
          >
            <div 
              className="relative max-w-[90vw] max-h-[80vh] md:max-h-[90vh] overflow-hidden flex items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
            >
              <img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={images[currentIndex].altText}
                className={`block max-w-full max-h-full object-contain transition-transform duration-200 select-none ${
                  zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transformOrigin: 'center center',
                  willChange: 'transform'
                }}
                onClick={handleFullscreenImageClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              {/* Fullscreen Controls */}
              <div className={`absolute top-4 right-4 flex gap-2 transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showUITemporarily();
                    downloadImage();
                  }}
                  className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
                  aria-label="Download image"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showUITemporarily();
                    handleCloseFullscreen();
                  }}
                  className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
                  aria-label="Close fullscreen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Zoom Level Indicator */}
              <div className={`absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {Math.round(zoomLevel * 100)}% {zoomLevel === 1 ? '(Click to zoom)' : '(Click to zoom out)'}
              </div>

              {/* Instructions */}
              <div className={`absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-xs transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                Click to zoom {zoomLevel === 1 ? 'in' : 'out'} • {zoomLevel > 1 ? 'Drag to pan' : ''}
              </div>

              {/* Fullscreen Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showUITemporarily();
                      navigateToImage(currentIndex - 1);
                    }}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showUITemporarily();
                      navigateToImage(currentIndex + 1);
                    }}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Fullscreen Counter */}
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Fullscreen Caption - Desktop (overlay) */}
              {images[currentIndex].caption && (
                <div className="hidden md:block absolute bottom-16 left-4 right-4 text-center pointer-events-none">
                  <p className="text-white bg-black bg-opacity-75 px-4 py-2 rounded-lg max-w-2xl mx-auto">
                    {images[currentIndex].caption}
                  </p>
                </div>
              )}
            </div>
            
            {/* Mobile Caption - Separated below image */}
            {images[currentIndex].caption && (
              <div className="md:hidden w-full max-w-[90vw] mt-4 px-4">
                <p className="text-white text-center bg-gray-800 bg-opacity-90 px-4 py-3 rounded-lg text-sm leading-relaxed">
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;