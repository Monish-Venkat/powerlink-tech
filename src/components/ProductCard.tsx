
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface Product {
  name: string;
  brand: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onBuyClick: () => void;
}

const ProductCard = ({ product, onBuyClick }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <div className="mb-3">
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {product.brand}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4">{product.category}</p>
        <Button 
          onClick={onBuyClick}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all duration-300"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
