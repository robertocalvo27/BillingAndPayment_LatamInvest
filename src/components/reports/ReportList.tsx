import React, { useState } from 'react';
import { Report, ReportSection } from '../../types/reports';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ReportListProps {
  sections: ReportSection[];
  onToggleFavorite: (reportId: string) => void;
  onSelectReport: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  sections,
  onToggleFavorite,
  onSelectReport,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['favorites']);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.title} className="border rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-medium">{section.title}</span>
            <svg
              className={clsx(
                'h-5 w-5 transform transition-transform',
                expandedSections.includes(section.title) ? 'rotate-180' : ''
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {expandedSections.includes(section.title) && (
            <div className="border-t">
              {section.reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectReport(report)}
                >
                  <div className="flex items-center space-x-3">
                    {report.icon && (
                      <span className="text-gray-500">{report.icon}</span>
                    )}
                    <span>{report.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(report.id);
                    }}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    {report.isFavorite ? (
                      <StarSolid className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportList; 