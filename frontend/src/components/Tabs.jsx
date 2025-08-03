import React, { useState } from 'react';

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => handleTabClick(index)}
          className={`px-4 py-2 font-medium ${
            activeTab === index
              ? 'border-b-2 border-black text-black dark:text-white'
              : 'text-gray-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
