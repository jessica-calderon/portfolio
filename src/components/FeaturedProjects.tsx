import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const FeaturedProjects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "MySpace Portfolio",
      description: "A nostalgic portfolio website inspired by the classic MySpace layout, featuring modern React development with TypeScript, Tailwind CSS, and responsive design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://jessica-calderon.github.io/myspace-portfolio/",
      githubUrl: "https://github.com/jessica-calderon/myspace-portfolio",
      featured: true
    },
    {
      id: 2,
      title: "Moodle Workplace Integration",
      description: "Enterprise-level data integration system for Moodle Workplace, featuring automated data pipelines, real-time synchronization, and comprehensive reporting dashboards.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["PHP", "PostgreSQL", "Docker", "AWS ECS"],
      liveUrl: "https://moodle.company.com",
      featured: true
    },
    {
      id: 3,
      title: "Iron Bank Container Registry",
      description: "Secure container registry management system with STIG compliance, automated vulnerability scanning, and CI/CD pipeline integration for defense contractors.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
      technologies: ["Docker", "AWS", "GitLab CI", "STIG"],
      githubUrl: "https://github.com/jessica-calderon/iron-bank-registry",
      featured: true
    },
    {
      id: 4,
      title: "Data Analytics Dashboard",
      description: "Interactive business intelligence dashboard with real-time data visualization, custom reporting tools, and automated insights generation using Apache Superset.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["Python", "Apache Superset", "PostgreSQL", "Redis"],
      liveUrl: "https://analytics.company.com",
      featured: true
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-6 rounded-lg">
      <h3 className="font-bold text-white text-lg mb-4 bg-blue-500 dark:bg-blue-600 px-3 py-2 -mx-6 -mt-6 rounded-t-lg">
        ✨ Jessica's Featured Projects ✨
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 border-2 border-blue-300 dark:border-blue-500 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            {/* Project Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                ⭐ Featured
              </div>
            </div>

            {/* Project Content */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h4>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    🌐 Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    📁 GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Projects Link */}
      <div className="mt-6 text-center">
        <a 
          href="https://github.com/jessica-calderon"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <span>🚀</span>
          View All Projects on GitHub
          <span>🚀</span>
        </a>
      </div>
    </div>
  );
};

export default FeaturedProjects;
