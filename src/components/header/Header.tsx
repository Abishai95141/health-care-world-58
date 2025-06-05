
import React from 'react';
import UtilityBar from './UtilityBar';
import MainNavigation from './MainNavigation';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <UtilityBar />
      <MainNavigation />
    </header>
  );
};

export default Header;
