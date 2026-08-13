import React from 'react';
import MySpaceTable from './shared/MySpaceTable';
import { SKILL_CATEGORIES } from '../data/skills';

interface SkillsTableProps {
  isMyspaceMode?: boolean;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ isMyspaceMode = false }) => {
  const skillsData = SKILL_CATEGORIES.map(({ label, value }) => ({ label, value }));

  return (
    <MySpaceTable
      title="Jessica's Technical Skills"
      rows={skillsData}
      className=""
      isMyspaceMode={isMyspaceMode}
    />
  );
};

export default SkillsTable;
