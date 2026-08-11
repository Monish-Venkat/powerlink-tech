import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Zap, Shield, Sun, ExternalLink, Award, Clock, MapPin, TrendingUp, Star
} from 'lucide-react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface Product {
  name: string;
  brand: string;
  category: string;
  image: string;
  features?: string[];
  rating?: number;
  capacity?: string;
}

interface ProductCardProps {
  product: Product;
  onBuyClick: (productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const magnetic = useMagnetic<HTMLButtonElement>(0.2);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'UPS & Inverters':
      case 'UPS Inverters':
        return Zap;
      case 'CCTV Security':
        return Shield;
      case 'Solar Solutions':
        return Sun;
      case 'Batteries':
        return TrendingUp;
      default:
        return Zap;
    }
  };

  const IconComponent = getCategoryIcon(product.category);

  return (
    <Card className="bg-white hover-subtle-glow group overflow-hidden rounded-3xl border border-accent-blue/20 shadow-xl transition-all duration-500 cursor-pointer relative">
      {/* Category Badge */}
      <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-accent-blue to-secondary/80 backdrop-blur-sm px-4 py-2 rounded-2xl font-bold text-white text-sm shadow-2xl">
        <IconComponent className="w-4 h-4 inline mr-2" />
        {product.category}
      </div>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden rounded-t-3xl">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-loading bg-gradient-to-r from-muted/50 to-card/50" />
        )}

        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-primary-dark/40 gap-3">
            <IconComponent className="w-16 h-16" />
            <span className="text-sm font-medium">{product.brand}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            draggable={false}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* Feature Highlights */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
          {product.features?.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-sm shadow-lg">
              <Award className="w-4 h-4 text-accent-blue flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <CardHeader className="p-8 pb-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-light font-bold text-lg">
                {product.brand.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-bold text-accent-blue text-sm uppercase tracking-wide">
              {product.brand}
            </span>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">{product.rating}</span>
            </div>
          )}
        </div>

        <CardTitle className="font-display text-2xl font-bold text-primary-dark mb-3 group-hover:text-accent-blue transition-colors duration-300 leading-tight line-clamp-2">
          {product.name}
        </CardTitle>

        {product.capacity && (
          <CardDescription className="text-lg font-semibold text-primary-dark/80 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-blue" />
            {product.capacity}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <Button
          ref={magnetic.ref}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          onClick={() => onBuyClick(product.name)}
          className="w-full ripple-effect executive-gradient text-primary-light font-semibold py-6 px-8 rounded-2xl shadow-lg text-base transition-all duration-300 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Get Instant Quote
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-accent-blue/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-700" />
        </Button>
      </CardContent>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-blue/30 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />
    </Card>
  );
};

export default ProductCard;
