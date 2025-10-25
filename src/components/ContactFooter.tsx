import React from 'react';

interface ContactLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  description: string;
}

const ContactFooter: React.FC = () => {
  const contactLinks: ContactLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/jessica-calderon",
      icon: "🐙",
      color: "bg-gray-800 hover:bg-gray-900",
      description: "View my code repositories and contributions"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/Jessica-Calderon-00",
      icon: "💼",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Connect with me professionally"
    },
    {
      name: "Email",
      url: "mailto:calderonjessica13@yahoo.com",
      icon: "📧",
      color: "bg-red-600 hover:bg-red-700",
      description: "Send me a message directly"
    },
    {
      name: "Portfolio",
      url: "https://jessicacalderon.dev",
      icon: "🌐",
      color: "bg-green-600 hover:bg-green-700",
      description: "Visit my main portfolio website"
    }
  ];

  const handleContactClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12 px-6 mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            🚀 Let's Connect! 🚀
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Ready to collaborate on your next project? I'm always excited to work with innovative teams and tackle challenging problems!
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contactLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleContactClick(link.url)}
              className={`${link.color} text-white p-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:animate-bounce">
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {link.name}
                </h3>
                <p className="text-sm opacity-90">
                  {link.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white dark:bg-gray-800 bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white dark:border-gray-600 border-opacity-20">
          <h3 className="text-2xl font-bold mb-4">
            💡 Have a Project in Mind?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            I specialize in React/TypeScript development, cloud infrastructure, and enterprise integrations. 
            Let's discuss how I can help bring your vision to life!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:calderonjessica13@yahoo.com?subject=Project Inquiry"
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              📧 Start a Conversation
            </a>
            <a
              href="https://docs.google.com/document/d/1Te9UsvtdF-xzI0v7cLMYAuTnDRmaPyOiDUH30E5XXT8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 px-6 py-3 rounded-lg font-bold hover:bg-white dark:hover:bg-gray-300 hover:text-blue-600 dark:hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              📄 View Resume
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 pt-6 border-t border-white border-opacity-20">
          <p className="text-sm opacity-75">
            © 2024 Jessica Calderon • Full-Stack Developer • Available for New Opportunities
          </p>
          <p className="text-xs opacity-60 mt-2">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
