import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface TableRow {
  label: string;
  value: string | React.ReactNode;
}

interface MySpaceTableProps {
  title: string;
  rows: TableRow[];
  className?: string;
  isMyspaceMode?: boolean;
}

const MySpaceTable: React.FC<MySpaceTableProps> = ({ title, rows, className = '', isMyspaceMode = false }) => {
  const { isDarkMode } = useDarkMode();

  // Get label text color based on theme
  const getLabelColor = () => {
    if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300 (uses CSS var in myspace mode)
    if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-800
    if (isDarkMode) return '#93c5fd'; // blue-300
    return '#336699'; // default blue
  };

  // Get value text color based on theme
  const getValueColor = () => {
    if (isMyspaceMode && isDarkMode) return '#e0e0e0'; // gray-200 (uses CSS var in myspace mode)
    if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-900
    if (isDarkMode) return '#e5e7eb'; // gray-200
    return '#000000'; // black
  };

  const labelColor = getLabelColor();
  const valueColor = getValueColor();

  return (
    <div className={`bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 section-spacing p-2 ${className}`}>
      <div className="overflow-x-auto">
        <table className="myspace-details-box border-0">
        <thead>
          <tr>
            <th colSpan={2} className={`whitespace-nowrap custom-font ${isMyspaceMode ? '' : 'text-white'}`}>{title}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td 
                className="whitespace-nowrap custom-font font-bold" 
                style={{ color: labelColor }}
              >
                {row.label}:
              </td>
              <td 
                className="custom-font" 
                style={{ color: valueColor }}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MySpaceTable;
