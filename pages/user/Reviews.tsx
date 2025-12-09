import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, Package } from 'lucide-react';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data - em produção virá do Supabase
const mockReviews: Review[] = [];

export const UserReviews: React.FC = () => {
  const [reviews] = useState<Review[]>(mockReviews);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-warning fill-warning' : 'text-grayMedium'}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white uppercase">Minhas Avaliações</h1>
        <p className="text-grayLight text-sm">Avaliações que você fez de produtos comprados</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-grayDark rounded-lg border border-grayMedium p-12 text-center">
          <MessageSquare size={64} className="mx-auto text-grayMedium mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Nenhuma avaliação ainda</h2>
          <p className="text-grayLight mb-6">
            Após receber seus produtos, você poderá avaliá-los aqui.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded font-bold hover:bg-primaryDark transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-grayDark rounded-lg border border-grayMedium p-5">
              <div className="flex gap-4">
                <Link to={`/product/${review.productId}`}>
                  <img 
                    src={review.productImage} 
                    alt="" 
                    className="w-20 h-20 object-cover rounded bg-blackCarbon"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${review.productId}`}>
                    <h3 className="font-bold text-white hover:text-primary transition-colors">
                      {review.productName}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 my-2">
                    {renderStars(review.rating)}
                    <span className="text-xs text-grayLight">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-grayLight text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-heading text-white uppercase mb-4">Produtos para Avaliar</h2>
        <div className="bg-grayDark rounded-lg border border-grayMedium p-8 text-center">
          <Package size={48} className="mx-auto text-grayMedium mb-4" />
          <p className="text-grayLight">
            Nenhum produto pendente de avaliação.
          </p>
        </div>
      </div>
    </div>
  );
};
