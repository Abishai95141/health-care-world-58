
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WriteReviewForm from './WriteReviewForm';

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  productId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ productId }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  
  // Mock data - in a real app, this would come from your API
  const reviews: Review[] = [
    {
      id: '1',
      reviewer_name: 'Sarah M.',
      rating: 5,
      comment: 'Excellent product! Fast delivery and great quality. Highly recommended.',
      date: '2024-01-15'
    },
    {
      id: '2',
      reviewer_name: 'John D.',
      rating: 4,
      comment: 'Good quality medicine, works as expected. Packaging could be better.',
      date: '2024-01-10'
    },
    {
      id: '3',
      reviewer_name: 'Maria L.',
      rating: 5,
      comment: 'Perfect! Exactly what I needed. Will order again.',
      date: '2024-01-08'
    }
  ];

  const averageRating = 4.2;
  const totalReviews = 209;

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`${starSize} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (showWriteReview) {
    return (
      <WriteReviewForm 
        productId={productId}
        onCancel={() => setShowWriteReview(false)}
        onSubmit={() => {
          setShowWriteReview(false);
          // In a real app, you'd refresh the reviews here
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          {renderStars(Math.floor(averageRating), 'lg')}
          <div>
            <span className="text-3xl font-bold text-[#111]">{averageRating}</span>
            <span className="text-gray-600 ml-2">out of 5</span>
          </div>
        </div>
        <p className="text-gray-600">({totalReviews} reviews)</p>
        
        <Button 
          onClick={() => setShowWriteReview(true)}
          className="mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent rounded-lg transition-all duration-200"
        >
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-[#111]">{review.reviewer_name}</h4>
                <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
