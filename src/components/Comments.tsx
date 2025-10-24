import React, { useState } from 'react';

interface Comment {
  id: number;
  name: string;
  role: string;
  comment: string;
  avatar?: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior DevOps Engineer at TechCorp",
      comment: "Jessica is a highly skilled engineer who consistently delivers secure, production-ready solutions. Her attention to detail and problem-solving abilities are exceptional.",
      avatar: "SC"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Lead Developer at DataFlow Inc",
      comment: "Her Superset containerization work saved our team countless hours — a true DevOps expert. Jessica's documentation and implementation were flawless.",
      avatar: "MR"
    },
    {
      id: 3,
      name: "Dr. Amanda Foster",
      role: "CTO at EduTech Solutions",
      comment: "Collaborating with Jessica on Moodle Workplace plugins was an absolute pleasure. Her technical expertise and collaborative spirit made the project a huge success.",
      avatar: "AF"
    }
  ]);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.comment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        name: newComment.name,
        role: newComment.email ? `Verified Professional` : 'Anonymous',
        comment: newComment.comment,
        avatar: newComment.name.charAt(0).toUpperCase() + (newComment.name.split(' ')[1]?.charAt(0) || '')
      };
      setComments([...comments, comment]);
      setNewComment({ name: '', email: '', comment: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-bold text-black dark:text-white text-sm">Recommendations</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">Comments</p>
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400">({comments.length})</span>
      </div>
      
      <p className="text-xs text-black dark:text-gray-300 mb-4">Professional recommendations and feedback from colleagues.</p>
      
      {/* Comments List */}
      <div className="space-y-3 mb-6">
        {comments.map((comment, index) => (
          <div 
            key={comment.id} 
            className={`border border-gray-300 dark:border-gray-600 p-3 ${
              index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {comment.avatar}
              </div>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold text-black dark:text-white">{comment.name}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 italic">• {comment.role}</span>
                </div>
                <p className="text-xs text-black dark:text-gray-300 leading-relaxed">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
        <h3 className="text-xs font-bold text-black dark:text-white mb-3">Leave a Recommendation</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-black dark:text-white mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={newComment.name}
                onChange={handleInputChange}
                required
                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs text-black dark:text-white mb-1">Email (optional)</label>
              <input
                type="email"
                name="email"
                value={newComment.email}
                onChange={handleInputChange}
                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-black dark:text-white"
                placeholder="your.email@company.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-black dark:text-white mb-1">Your Recommendation *</label>
            <textarea
              name="comment"
              value={newComment.comment}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder="Share your professional experience working with Jessica..."
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="myspace-button hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
