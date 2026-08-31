import React, { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import SearchHighlight from './shared/SearchHighlight';
import MySpaceContainer from './shared/MySpaceContainer';
import ThemeAwareHeader from './shared/ThemeAwareHeader';
import { useOsWindow } from '../contexts/OsWindowContext';
import { LEGACY_PORTFOLIO_URL } from '../constants/urls';

interface CaseStudy {
  name: string;
  description: string;
  impact: string;
  techUsed: string[];
  emoji: string;
  websiteUrl?: string;
  githubUrl?: string;
}

interface CaseStudiesGridProps {
  isMyspaceMode: boolean;
  searchQuery: string;
  /** When true, skip outer MySpace box/header — parent DIV layout provides chrome. */
  embedded?: boolean;
}

const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  isMyspaceMode,
  searchQuery,
  embedded = false,
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const { open } = useOsWindow();

  const caseStudies: CaseStudy[] = [
    {
      name: "Workers Room — Silicon Valley Homelab Dashboard",
      description: "A retro-futuristic homelab command center inspired by Pied Piper from Silicon Valley. Built to manage Cursor CLI subagents with a nostalgic TV studio aesthetic — featuring worker status boards, server closet monitoring, on-air broadcast controls, and a Blockbuster-style media shelf. Complete with character-themed agent slots (Richard, Gilfoyle, Dinesh...) and real-time system vitals.",
      impact: "Turns homelab chaos into an immersive, themed experience while stress-testing subagent orchestration in a fun, visual way. Because infrastructure should have personality.",
      techUsed: ["React", "TypeScript", "Cursor CLI", "Docker", "Jellyfin", "Tunarr", "Prometheus", "Grafana"],
      emoji: "📺"
    },
    { 
      name: "Secure Analytics Integration",
      description: "Built a data visualization bridge connecting a learning platform to a secure analytics environment — wiring dashboards, data flow, and containerized services so teams could actually use the numbers.",
      impact: "Faster, more reliable dashboards without giving up security or compliance constraints.",
      techUsed: ["Docker", "Apache Superset", "AWS ECS", "PostgreSQL"],
      emoji: "📈"
    },
    { 
      name: "Centralized Log Ingestion",
      description: "Implemented a Fluent Bit → OpenSearch pipeline for system observability across containerized services.",
      impact: "Enabled real-time error detection and analytics when something inevitably went sideways.",
      techUsed: ["Fluent Bit", "OpenSearch", "AWS CloudWatch"],
      emoji: "📝"
    },
    { 
      name: "Integrated Support Workflow",
      description: "Designed and developed an integrated support workflow that lets users create, track, and interact with support requests directly within an enterprise learning platform. Custom plugin development with REST API integration, workflow/status mapping, user-specific ticket visibility, and a native UI for comments and attachments.",
      impact: "Reduced friction between users and support teams by bringing ticket submission, status tracking, comments, and attachments into the application’s existing user experience.",
      techUsed: ["PHP", "JavaScript", "REST APIs", "Moodle", "Git"],
      emoji: "🎫"
    },
    {
      name: "Homelab / Self-Hosted Infrastructure",
      description: "A Linux-based self-hosted environment I use to experiment with containers, storage, networking, reverse proxies, monitoring, automation, and media infrastructure. Built to tinker, break things, and learn how the stack actually behaves.",
      impact: "Hands-on practice with real infrastructure problems — the fun kind, usually.",
      techUsed: ["Docker", "Docker Compose", "Linux", "Traefik", "Jellyfin", "Portainer"],
      emoji: "🏠"
    },
    {
      name: "Finity — Roku / Jellyfin Client",
      description: "A custom Roku client for Jellyfin that I'm building for fun. Focused on BrightScript, SceneGraph, Jellyfin integration, custom UI/UX, and deployment tooling.",
      impact: "Personal project exploring streaming client UX and Roku development end to end.",
      techUsed: ["BrightScript", "SceneGraph", "Roku", "Jellyfin"],
      emoji: "📺"
    },
    {
      name: "All Shades of Texas Website",
      description: "Designed and developed a responsive website for a local window treatment business in San Antonio.",
      impact: "Delivered a clean, accessible front-end experience optimized for mobile and local search visibility.",
      techUsed: ["HTML5", "CSS3", "JavaScript", "PHP"],
      emoji: "🪟",
      websiteUrl: "https://allshadesoftexas.net/"
    },
    {
      name: "MySpace-Inspired Portfolio",
      description: "Built a modern React portfolio inspired by the original MySpace profile layout, featuring custom themes, modals, and retro UI elements. This is the portfolio you are currently viewing.",
      impact: "Highlights front-end creativity and technical depth with a nostalgic, interactive user experience.",
      techUsed: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      emoji: "💻",
      githubUrl: "https://github.com/jessica-calderon/portfolio"
    },
    {
      name: "Legacy Portfolio",
      description: "Created the original version of my developer portfolio using Bootstrap, HTML, CSS, and JavaScript.",
      impact: "Served as an early showcase of projects and web development fundamentals before transitioning to a modern React stack.",
      techUsed: ["Bootstrap", "HTML", "CSS", "JavaScript"],
      emoji: "🧩",
      websiteUrl: LEGACY_PORTFOLIO_URL,
      githubUrl: "https://github.com/jessica-calderon/portfolio-legacy"
    }
  ];

  // Filter case studies based on search query
  const matchesQuery = (caseStudy: CaseStudy): boolean => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      caseStudy.name.toLowerCase().includes(query) ||
      caseStudy.description.toLowerCase().includes(query) ||
      caseStudy.impact.toLowerCase().includes(query) ||
      caseStudy.techUsed.some(tech => tech.toLowerCase().includes(query))
    );
  };

  const filteredStudies = caseStudies.filter(matchesQuery);

  // Hide entire section if no matches during search
  if (searchQuery.trim() && filteredStudies.length === 0) {
    return null;
  }

  const countLine = (
    <p className="text-xs mb-3 text-black dark:text-gray-300 custom-font">
      {embedded ? (
        <>
          Displaying{' '}
          <span className="custom-font font-bold text-gray-800 dark:text-gray-100">
            {filteredStudies.length}
          </span>
          {' '}of{' '}
          <span className="custom-font font-bold text-gray-800 dark:text-gray-100">
            {caseStudies.length}
          </span>
          {' '}Featured Case Studies.
        </>
      ) : (
        <>
          Jessica has{' '}
          <span className="custom-font font-bold text-gray-800 dark:text-gray-100">
            {caseStudies.length}
          </span>
          {' '}Featured Case Studies.
        </>
      )}
      {searchQuery && filteredStudies.length < caseStudies.length && (
        <span className="ml-2 text-pink-600 dark:text-pink-400 custom-font">
          ({filteredStudies.length} match{filteredStudies.length !== 1 ? 'es' : ''})
        </span>
      )}
    </p>
  );

  const grid = filteredStudies.length > 0 ? (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
      {filteredStudies.map((caseStudy, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer p-2 rounded transition-all duration-200 hover:scale-[1.03] hover:shadow-md search-result-match ${
            searchQuery ? 'ring-2 ring-blue-400 dark:ring-blue-500 animate-pulse-subtle' : ''
          }`}
          onClick={() => setSelectedCaseStudy(caseStudy)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedCaseStudy(caseStudy);
            }
          }}
          aria-label={`View case study: ${caseStudy.name}`}
        >
          <div
            className="w-16 h-16 sm:w-[100px] sm:h-[100px] bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center mb-2 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
            style={{
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">{caseStudy.emoji}</span>
            </div>
          </div>
          <p className="text-sm font-bold mb-1 mt-1 text-center">
            <span className="text-black dark:text-white break-words">
              <SearchHighlight text={caseStudy.name} searchQuery={searchQuery} />
            </span>
          </p>
          <p className="text-xs italic leading-tight text-center">
            <span className="text-gray-600 dark:text-gray-400">Click to view case study</span>
          </p>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <>
      {embedded ? (
        <div className="jdiv-embedded-case-studies">
          {countLine}
          {grid}
        </div>
      ) : (
      <MySpaceContainer isMyspaceMode={isMyspaceMode} searchQuery={searchQuery}>
        <ThemeAwareHeader isMyspaceMode={isMyspaceMode}>
          Jessica's Case Studies
        </ThemeAwareHeader>
        {countLine}
        {grid}
      </MySpaceContainer>
      )}

      {selectedCaseStudy && (
        <CaseStudyModal 
          caseStudy={selectedCaseStudy} 
          onClose={() => setSelectedCaseStudy(null)}
          onViewHomelab={
            selectedCaseStudy.name.toLowerCase().includes('homelab')
              ? () => {
                  setSelectedCaseStudy(null);
                  open('networkPlaces');
                }
              : undefined
          }
          onVisitWebsite={
            selectedCaseStudy.name === 'Legacy Portfolio'
              ? () => {
                  setSelectedCaseStudy(null);
                  open('legacyIe');
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default CaseStudiesGrid;
