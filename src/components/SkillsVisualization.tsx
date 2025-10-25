import React from 'react';

interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
  icon: string;
  color: string;
}

const SkillsVisualization: React.FC = () => {
  const skills: Skill[] = [
    // Programming Languages
    { name: "TypeScript", level: 95, category: "Programming", icon: "🔷", color: "bg-blue-500" },
    { name: "JavaScript", level: 98, category: "Programming", icon: "🟨", color: "bg-yellow-500" },
    { name: "PHP", level: 90, category: "Programming", icon: "🟣", color: "bg-purple-500" },
    { name: "Python", level: 85, category: "Programming", icon: "🐍", color: "bg-green-500" },
    
    // Frontend Technologies
    { name: "React", level: 95, category: "Frontend", icon: "⚛️", color: "bg-cyan-500" },
    { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "🎨", color: "bg-teal-500" },
    { name: "HTML/CSS", level: 98, category: "Frontend", icon: "🌐", color: "bg-orange-500" },
    
    // Backend & DevOps
    { name: "Node.js", level: 88, category: "Backend", icon: "🟢", color: "bg-green-600" },
    { name: "Docker", level: 90, category: "DevOps", icon: "🐳", color: "bg-blue-600" },
    { name: "AWS", level: 85, category: "Cloud", icon: "☁️", color: "bg-orange-600" },
    { name: "GitLab CI", level: 88, category: "DevOps", icon: "🦊", color: "bg-red-500" },
    
    // Databases
    { name: "PostgreSQL", level: 90, category: "Database", icon: "🐘", color: "bg-indigo-600" },
    { name: "MySQL", level: 85, category: "Database", icon: "🐬", color: "bg-blue-500" },
    { name: "Redis", level: 80, category: "Database", icon: "🔴", color: "bg-red-600" },
    
    // Specialized Skills
    { name: "Moodle Workplace", level: 95, category: "Specialized", icon: "🎓", color: "bg-purple-600" },
    { name: "STIG Compliance", level: 88, category: "Security", icon: "🔒", color: "bg-gray-600" },
    { name: "Data Integration", level: 92, category: "Specialized", icon: "📊", color: "bg-pink-500" }
  ];

  const categories = ["Programming", "Frontend", "Backend", "DevOps", "Cloud", "Database", "Specialized", "Security"];

  const getSkillLevel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Intermediate";
    return "Beginner";
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return "text-green-600 dark:text-green-400";
    if (level >= 80) return "text-blue-600 dark:text-blue-400";
    if (level >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 p-6 rounded-lg">
      <h3 className="font-bold text-white text-lg mb-6 bg-blue-500 dark:bg-blue-600 px-3 py-2 -mx-6 -mt-6 rounded-t-lg">
        🎯 Jessica's Technical Skills 🎯
      </h3>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{skill.icon}</span>
                <span className="font-semibold text-gray-800 dark:text-white text-sm">
                  {skill.name}
                </span>
              </div>
              <span className={`text-xs font-medium ${getSkillColor(skill.level)}`}>
                {getSkillLevel(skill.level)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {skill.category}
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {skill.level}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-gray-800 dark:text-white text-center">
          📚 Skills by Category 📚
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
            
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-600 dark:to-gray-700 border border-blue-200 dark:border-gray-500 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <h5 className="font-bold text-gray-800 dark:text-white text-sm mb-2">
                  {category}
                </h5>
                <div className="text-2xl mb-2">
                  {category === "Programming" && "💻"}
                  {category === "Frontend" && "🎨"}
                  {category === "Backend" && "⚙️"}
                  {category === "DevOps" && "🔧"}
                  {category === "Cloud" && "☁️"}
                  {category === "Database" && "🗄️"}
                  {category === "Specialized" && "⭐"}
                  {category === "Security" && "🔒"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {categorySkills.length} skills
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {Math.round(avgLevel)}% avg
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-gray-500 rounded-lg p-4">
        <h4 className="font-bold text-gray-800 dark:text-white text-center mb-3">
          🏆 Skills Summary 🏆
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skills.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {skills.filter(s => s.level >= 90).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Expert Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {categories.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Proficiency</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsVisualization;
