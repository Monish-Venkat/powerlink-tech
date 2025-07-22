
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out cursor-pointer"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          onClick={() => openModal(currentImageIndex)}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-64 object-cover flex-shrink-0 hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[modalImageIndex]}
              alt={`${title} - Image ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-3"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-3"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Modal image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {modalImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
