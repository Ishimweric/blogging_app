import React, { useState } from 'react';
import Tabs from './components/Tabs';
import BlogFeed from './components/BlogFeed';
import Footer from './components/Footer';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['All', 'Popular', 'Tech', 'Food'];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs 
          tabs={tabs} 
          activeTab={selectedTab} 
          onTabChange={setSelectedTab} 
        />
        <BlogFeed filter={selectedTab > 0 ? tabs[selectedTab].toLowerCase() : null} />
      </main>
      <Footer />
    </div>
  );
};

export default App;