import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import BlogFeed from '../components/BlogFeed';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Popular feeds', 'Recent Posts', 'Tech-related', 'Food-related'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Tabs tabs={tabs} onTabChange={setSelectedTab} />
      <BlogFeed category={tabs[selectedTab]} />
    </div>
  );
};

export default Home;
