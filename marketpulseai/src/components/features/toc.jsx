'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const items = [
    { id: 'Daily', title: 'Daily' },
    { id: 'Weekly', title: 'Weekly' },
    { id: 'Monthly', title: 'Monthly' },
  ];

export default function TableOfContents1() {


  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 50; // Adjust this value as needed
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Element's position relative to the viewport
      const offsetPosition = elementPosition - offset; // Adjusted position with offset
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', // Smooth scrolling
      });
  
      setActiveId(id);
    }
  };

  return (
    <>
<nav className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-[1px] bg-gray-300"></div>

      <ul className="space-y-6 pl-8">
        {items.map((item) => (
          <li key={item.id} className="relative">
            {/* Dot */}
            <div
              className={cn(
                "absolute -left-[23px] top-2 w-4 h-4 rounded-full border-2 transition-colors",
                activeId === item.id ? "bg-primary border-primary" : "bg-white border-gray-300"
              )}
            ></div>
            <button
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "w-full text-left px-2 py-1 rounded transition-colors",
                activeId === item.id ? "text-white bg-primary font-bold" : "hover:text-gray-500"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </>

  );
}