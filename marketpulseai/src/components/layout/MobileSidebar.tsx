// components/layout/MobileSidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { Menu, X, Home, TrendingUp,ChevronUp, ChevronDown} from 'lucide-react';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = async (id: string) => {
    if (pathname == '/') {
      const element = document.getElementById(id);
      if(element) element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close sidebar after clicking
    }else{
        await router.push('/');
        setIsOpen(false)
        setTimeout(() => {
            const element = document.getElementById(id);
            if(element) element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }
  };

  const items = [
    { id: 'Daily', title: 'Daily Market Insights' },
    { id: 'Weekly', title: 'Weekly Analysis' },
    { id: 'Monthly', title: 'Monthly Analysis' },
    { id : 'recommendations', title: "Recent Signals"}
  ];
  return (
    <>
      {/* Hamburger menu button - only visible on mobile */}
      <button
        onClick={toggleSidebar}
        //bg-white shadow-md
        className="fixed top-4 left-4 z-[105] p-2 rounded-md md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[99] md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4 space-y-4 mt-16">
          {/* Home section with dropdown */}
          <div className="space-y-2">
            <button
              onClick={() => setIsHomeExpanded(!isHomeExpanded)}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <Link
                    href="/"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                    >
                        <Home size={20} className='text-primary'/>
                        <span className='text-primary'>Market Monitor</span>
                </Link>
              </div>
              {isHomeExpanded ? <ChevronUp size={20} className='text-primary'/> : <ChevronDown size={20} className='text-primary'/>}
            </button>

            {/* Dropdown content */}
            {isHomeExpanded && (
              <div className="ml-8 space-y-2">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <Link
            href="/performance"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <TrendingUp size={20} />
            <span className='text-primary'>All Recommendations</span>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[95] md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default MobileSidebar;
