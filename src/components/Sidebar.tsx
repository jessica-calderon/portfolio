import React, { useState } from 'react';
import ResumeModal from './ResumeModal';
import ShareProfileModal from './ShareProfileModal';
import RatingModal from './RatingModal';
import CustomizeModal from './CustomizeModal';
import LegacyProfileModal from './LegacyProfileModal';
import ProfileSection from './ProfileSection';
import ContactSection from './ContactSection';
import PortfolioUrl from './PortfolioUrl';
import SkillsTable from './SkillsTable';
import LinksTable from './LinksTable';

interface SidebarProps {
  isMyspaceMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMyspaceMode = false }) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showLegacyModal, setShowLegacyModal] = useState(false);

  return (
    <div className="space-y-2">
      {/* Profile Picture and Basic Info */}
      <ProfileSection 
        onLegacyClick={() => setShowLegacyModal(true)}
      />

      {/* Contacting Jessica */}
      <ContactSection 
        onResumeClick={() => setShowResumeModal(true)}
        onShareClick={() => setShowShareModal(true)}
        onRatingClick={() => setShowRatingModal(true)}
        onCustomizeClick={() => setShowCustomizeModal(true)}
      />

      {/* Portfolio URL */}
      <PortfolioUrl />

      {/* Jessica's Technical Skills */}
      <SkillsTable isMyspaceMode={isMyspaceMode} />

      {/* Jessica's Links */}
      <LinksTable onResumeClick={() => setShowResumeModal(true)} isMyspaceMode={isMyspaceMode} />

      {/* Resume Modal */}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
      
      {/* Share Profile Modal */}
      {showShareModal && <ShareProfileModal onClose={() => setShowShareModal(false)} />}
      
      
      {/* Rating Modal */}
      {showRatingModal && <RatingModal onClose={() => setShowRatingModal(false)} />}
      
      {/* Customize Modal */}
      {showCustomizeModal && <CustomizeModal onClose={() => setShowCustomizeModal(false)} />}
      
      {/* Legacy Profile Modal */}
      {showLegacyModal && <LegacyProfileModal onClose={() => setShowLegacyModal(false)} />}
    </div>
  );
};

export default Sidebar;