import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import BlogFeed from '../components/BlogFeed';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['popular', 'recent', 'tech', 'food'];

  const getFilter = () => {
    switch(selectedTab) {
      case 0: return 'popular';
      case 1: return 'recent';
      case 2: return 'tech';
      case 3: return 'food';
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Tabs 
        tabs={['Popular feeds', 'Recent Posts', 'Tech-related', 'Food-related']} 
        onTabChange={setSelectedTab} 
      />
      <BlogFeed filter={getFilter()} />
    </div>
  );
};

export default Home;