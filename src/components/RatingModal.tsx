import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface RatingModalProps {
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      // Store rating in localStorage for persistence
      const ratings = JSON.parse(localStorage.getItem('portfolioRatings') || '[]');
      ratings.push({ rating, feedback, timestamp: new Date().toISOString() });
      localStorage.setItem('portfolioRatings', JSON.stringify(ratings));
      
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const getRatingMessage = (rating: number) => {
    const messages = {
      1: "😢 Ouch! What could be better?",
      2: "😐 Not bad, but room for improvement!",
      3: "😊 Pretty good! Thanks for the feedback!",
      4: "😍 Awesome! You're too kind!",
      5: "🤩 AMAZING! You made my day!"
    };
    return messages[rating as keyof typeof messages] || "";
  };

  const getRatingColor = (rating: number) => {
    const colors = {
      1: "#ff4444",
      2: "#ff8844", 
      3: "#ffaa44",
      4: "#44aa44",
      5: "#4444ff"
    };
    return colors[rating as keyof typeof colors] || "#666";
  };

  if (submitted) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
        onClick={handleBackdropClick}
        style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-submitted-title"
      >
        <div 
          className={`w-full max-w-md mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Windows XP-style title bar */}
          <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
            <span id="rating-submitted-title" className="text-sm">Rating Submitted!</span>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
              aria-label="Close rating submitted modal"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className={`p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: getRatingColor(rating) }}>
              {getRatingMessage(rating)}
            </h3>
            <div className="flex justify-center mb-4" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="text-2xl"
                  style={{ color: i < rating ? getRatingColor(rating) : isDarkMode ? '#555' : '#ddd' }}
                  aria-hidden="true"
                >
                  ⭐
                </span>
              ))}
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Thanks for rating my portfolio! Your feedback means a lot! 💜
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rating-modal-title"
    >
      <div 
        className={`w-full max-w-md mx-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border border-gray-400 dark:border-gray-600 overflow-hidden animate-modalAppear`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar */}
        <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between`}>
          <span id="rating-modal-title" className="text-sm">Rate Jessica's Profile</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
            aria-label="Close rating modal"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-[#ece9d8]'}`}>
          <h3 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>How would you rate this portfolio?</h3>
          
          {/* Star Rating */}
          <div className="flex justify-center mb-6" role="radiogroup" aria-label="Rating">
            {[...Array(5)].map((_, i) => {
              const starRating = i + 1;
              return (
                <button
                  key={i}
                  className="text-4xl transition-all duration-200 hover:scale-110 focus:outline-none"
                  onClick={() => setRating(starRating)}
                  onMouseEnter={() => setHoveredRating(starRating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  style={{ 
                    color: starRating <= (hoveredRating || rating) ? '#ffaa00' : '#ddd',
                    filter: starRating <= (hoveredRating || rating) ? 'drop-shadow(0 0 8px rgba(255, 170, 0, 0.5))' : 'none'
                  }}
                  role="radio"
                  aria-checked={starRating === rating}
                  aria-label={`Rate ${starRating} out of 5 stars`}
                >
                  <span aria-hidden="true">⭐</span>
                </button>
              );
            })}
          </div>

          {/* Rating Message */}
          {rating > 0 && (
            <div className="text-center mb-4">
              <p className="text-sm font-medium" style={{ color: getRatingColor(rating) }}>
                {getRatingMessage(rating)}
              </p>
            </div>
          )}

          {/* Feedback Input */}
          <div className="mb-4">
            <label htmlFor="rating-feedback" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Optional Feedback:</label>
            <textarea
              id="rating-feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell me what you think! 💭"
              className={`w-full p-2 border rounded text-sm resize-none ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-500'
                  : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
              }`}
              rows={3}
              maxLength={200}
              aria-label="Optional feedback text area"
            />
            <div className={`text-xs text-right mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {feedback.length}/200 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                rating > 0 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label={rating === 0 ? 'Submit rating (select a rating first)' : 'Submit rating'}
            >
              Submit Rating <span aria-hidden="true">🚀</span>
            </button>
          </div>

          {/* Fun Stats */}
          <div className={`mt-4 text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>💡 Your rating helps me improve!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
