'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if we're on a manager page (which has its own sidebar navigation)
  const isManagerPage = pathname.startsWith("/manager");
  
  // For manager pages, render children directly without Navbar
  if (isManagerPage) {
    return <>{children}</>;
  }
  
  // For all other pages (including staff pages), render with Navbar and proper layout
  return (
    <div className="flex gap-2 min-h-screen bg-amber-50">
      <Navbar />
      {children}
    </div>
  );
}
