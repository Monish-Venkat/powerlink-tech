import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    setIsImageLoaded(false);
  };

  const nextModalImage = () => {
    setIsImageLoaded(false);
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    setIsImageLoaded(false);
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-t-2xl group/gallery bg-gradient-to-br from-gray-100 to-blue-50">
        {/* Image Carousel */}
        <div 
          className="flex transition-transform duration-700 ease-out cursor-pointer"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          onClick={() => openModal(currentImageIndex)}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-64 flex-shrink-0 relative">
              <img
                src={image}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover group-hover/gallery:scale-110 transition-transform duration-700"
                onLoad={() => setIsImageLoaded(true)}
              />
              {/* Loading Shimmer */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              )}
            </div>
          ))}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs font-semibold opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 flex items-center gap-2">
          <ZoomIn className="w-4 h-4" />
          Click to enlarge
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 rounded-full p-3 opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 rounded-full p-3 opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Modern Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageLoaded(false);
                    setCurrentImageIndex(index);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex 
                      ? 'w-8 h-3 bg-white' 
                      : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-125'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Enhanced Image Counter */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-blue to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
          <span className="text-lg">{currentImageIndex + 1}</span>
          <span className="opacity-75">/</span>
          <span className="opacity-75">{images.length}</span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in">
          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full p-3 shadow-2xl z-10 transform hover:rotate-90 hover:scale-110 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Modal Content */}
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Main Image */}
            <div className="relative flex items-center justify-center">
              <img
                src={images[modalImageIndex]}
                alt={`${title} - Image ${modalImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-zoom-in"
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Loading Spinner */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  onClick={prevModalImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-full p-4 shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={nextModalImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-full p-4 shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Modal Counter & Title */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl">
              <p className="font-bold text-lg mb-1">{title}</p>
              <p className="text-sm opacity-90">Image {modalImageIndex + 1} of {images.length}</p>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md p-3 rounded-2xl">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setModalImageIndex(idx);
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      idx === modalImageIndex 
                        ? 'ring-4 ring-accent-blue scale-110' 
                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background-size: 1000px 100%;
        }

        .animate-zoom-in {
          animation: zoom-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProjectGallery;
