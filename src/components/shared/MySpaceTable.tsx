import React from 'react';

interface TableRow {
  label: string;
  value: string | React.ReactNode;
}

interface MySpaceTableProps {
  title: string;
  rows: TableRow[];
  className?: string;
}

const MySpaceTable: React.FC<MySpaceTableProps> = ({ title, rows, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="myspace-details-box border-blue-500 dark:border-blue-400">
        <thead>
          <tr>
            <th colSpan={2} className="whitespace-nowrap">{title}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap">{row.label}:</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySpaceTable;
