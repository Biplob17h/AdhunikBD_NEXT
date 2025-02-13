// components/VendorReview.js
import { FaStar, FaUserCircle } from 'react-icons/fa';

const VendorReview = () => {
  // Demo review data
  const reviews = [
    {
      id: 1,
      reviewer: 'John Doe',
      rating: 4.5,
      comment: 'Great service! The expert was very knowledgeable and helpful.',
      date: '2023-10-01',
    },
    {
      id: 2,
      reviewer: 'Jane Smith',
      rating: 5,
      comment: 'Excellent experience. Highly recommended!',
      date: '2023-10-05',
    },
    {
      id: 3,
      reviewer: 'Alice Johnson',
      rating: 3.8,
      comment: 'Good, but could be improved in communication.',
      date: '2023-10-10',
    },
  ];

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Review Section</h2>

      {/* Average Rating Card */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Average Rating</h3>
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-bold text-blue-600">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`w-6 h-6 ${
                  index < Math.round(averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Based on {reviews.length} reviews
        </p>
      </div>

      {/* Recent Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col md:flex-row items-start space-x-0 md:space-x-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0">
              <FaUserCircle className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                  {review.reviewer}
                </h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(review.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorReview; 