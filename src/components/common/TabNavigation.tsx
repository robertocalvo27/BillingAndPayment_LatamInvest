import React from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    e.preventDefault(); // Prevenir cualquier comportamiento por defecto
    onTabChange(tabId);
  };

  return (
    <div className={clsx('border-b border-slate-200', className)}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button" // Especificar explícitamente que es un botón tipo button
            onClick={(e) => handleTabClick(e, tab.id)}
            className={clsx(
              'tab-button whitespace-nowrap',
              activeTab === tab.id
                ? 'tab-button-active'
                : 'tab-button-inactive'
            )}
          >
            <div className="flex items-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;