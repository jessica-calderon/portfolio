import React from 'react';
import ProfileSection from './ProfileSection';
import ContactSection from './ContactSection';
import PortfolioUrl from './PortfolioUrl';
import SkillsTable from './SkillsTable';
import LinksTable from './LinksTable';
import { useOsWindow } from '../contexts/OsWindowContext';
import { tryNativeShare } from './ShareProfileModal';
import { PROFILE_URL } from '../constants/urls';

interface SidebarProps {
  isMyspaceMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMyspaceMode = false }) => {
  const { open } = useOsWindow();

  const handleShareClick = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : PROFILE_URL;
    const result = await tryNativeShare(url);
    if (result === 'shared' || result === 'aborted') return;
    open('share');
  };

  return (
    <div className="space-y-2">
      <ProfileSection onLegacyClick={() => open('legacyIe')} />

      <ContactSection
        onSendMessageClick={() => open('aim')}
        onResumeClick={() => open('resume')}
        onShareClick={handleShareClick}
        onSaveContactClick={() => open('saveContact')}
        onConnectClick={() => open('addNetwork')}
        onScheduleClick={() => open('scheduleCall')}
      />

      <PortfolioUrl />

      <SkillsTable isMyspaceMode={isMyspaceMode} />

      <LinksTable onResumeClick={() => open('resume')} isMyspaceMode={isMyspaceMode} />
    </div>
  );
};

export default Sidebar;
