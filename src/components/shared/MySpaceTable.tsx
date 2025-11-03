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
  const { isDarkMode, customization } = useDarkMode();

  // Get label text color - use default theme colors (not accent color)
  const getLabelColor = () => {
    if (isMyspaceMode && isDarkMode) return '#bb86fc'; // purple-300
    if (isMyspaceMode && !isDarkMode) return '#4c1d95'; // purple-800
    if (isDarkMode) return '#93c5fd'; // blue-300
    return '#336699'; // default blue
  };

  // Get value text color based on theme
  const getValueColor = () => {
    if (isDarkMode) return '#e5e7eb'; // gray-200
    return '#000000'; // black
  };

  // Get border color - match MySpaceContainer logic (darker border, not accent color)
  const getBorderClasses = () => {
    if (isMyspaceMode && !isDarkMode) return 'border-pink-500';
    if (isMyspaceMode && isDarkMode) return 'border-purple-500';
    return 'border-blue-500 dark:border-blue-400';
  };

  // Get header background color - classic MySpace blue, but allow theme override
  const getHeaderBgColor = () => {
    if (isMyspaceMode && !isDarkMode) return '#ec4899'; // pink-500
    if (isMyspaceMode && isDarkMode) return '#9333ea'; // purple-600
    // Classic MySpace blue for standard mode
    return '#3366cc'; // classic MySpace blue
  };

  const labelColor = getLabelColor();
  const valueColor = getValueColor();

  return (
    <div 
      className={`section-spacing myspace-table-container border-2 ${getBorderClasses()} ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="myspace-details-box w-full">
        <thead>
          <tr>
            <th 
              colSpan={2} 
              className="whitespace-nowrap custom-font text-white"
              style={{ backgroundColor: getHeaderBgColor() }}
            >
              {title}
            </th>
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
