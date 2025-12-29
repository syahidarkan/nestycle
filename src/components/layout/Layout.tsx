import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
