import React, { ReactNode } from 'react';
import { Tenali_Ramakrishna } from 'next/font/google'; 
const tenaliRamakrishna = Tenali_Ramakrishna({ weight: '400', subsets: ['latin'] });

export function useMDXComponents() {
  return {
    h1: ({ children }: { children: ReactNode }) => (
      <h1
        className="mdxh2 text-2xl font-normal"
        id={typeof children === 'string' 
          ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') 
          : undefined}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2
        className="mdxh2 text-2xl font-normal"
        id={typeof children === 'string' 
          ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') 
          : undefined}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3
        className="mdxh2 text-2xl font-normal"
        id={typeof children === 'string' 
          ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') 
          : undefined}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4
        className="mdxh2 text-2xl font-normal"
        id={typeof children === 'string' 
          ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') 
          : undefined}
      >
        {children}
      </h4>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <p className={`${tenaliRamakrishna.className} mdxp text-xl`}>{children}</p>
    ),
    a: ({ href, children }: { href: string; children: ReactNode }) => (
      <a href={href} className="text-blue-500">
        {children}
      </a>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul className="mdxul">{children}</ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol className="mdxol">{children}</ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li className={`${tenaliRamakrishna.className} mdxli text-xl`}>{children}</li>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="text-black font-semibold">{children}</strong>
    ),
  };
}
