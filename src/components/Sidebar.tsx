import React, { useState } from 'react';
import ResumeModal from './ResumeModal';
import ShareProfileModal from './ShareProfileModal';
import DinoGameModal from './DinoGameModal';
import ProfileSection from './ProfileSection';
import ContactSection from './ContactSection';
import PortfolioUrl from './PortfolioUrl';
import SkillsTable from './SkillsTable';
import LinksTable from './LinksTable';

const Sidebar: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDinoModal, setShowDinoModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Profile Picture and Basic Info */}
      <ProfileSection 
        onDinoGameClick={() => setShowDinoModal(true)}
        onResumeClick={() => setShowResumeModal(true)}
      />

      {/* Contacting Jessica */}
      <ContactSection 
        onResumeClick={() => setShowResumeModal(true)}
        onShareClick={() => setShowShareModal(true)}
      />

      {/* Portfolio URL */}
      <PortfolioUrl />

      {/* Jessica's Technical Skills and Links Container */}
      <div className="myspace-details-container">
        {/* Jessica's Technical Skills */}
        <SkillsTable />

        {/* Jessica's Links */}
        <LinksTable onResumeClick={() => setShowResumeModal(true)} />
      </div>

      {/* Resume Modal */}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
      
      {/* Share Profile Modal */}
      {showShareModal && <ShareProfileModal onClose={() => setShowShareModal(false)} />}
      
      {/* Dino Game Modal */}
      {showDinoModal && <DinoGameModal onClose={() => setShowDinoModal(false)} />}
    </div>
  );
};

export default Sidebar;