import React from 'react';

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m-9.75 0V4.5c0-.212.03-.418.084-.612m0 0c.276-.945 1.136-1.638 2.166-1.638h3c1.03 0 1.9.693 2.166 1.638m-7.332 0c.636 1.03 1.936 1.638 3.25 1.638h3c1.314 0 2.614-.608 3.25-1.638m-11.5 6.062c.312-.516.762-1.022 1.25-1.438m11.5 1.438c-.488.416-.938.922-1.25 1.438m-10.25 0a4.5 4.5 0 018.5 0m-8.5 0a4.5 4.5 0 00-4.25 4.5c0 1.91.832 3.633 2.125 4.813m12.75-4.813A4.5 4.5 0 0118.75 10.5m-10.25 0h10.25" />
  </svg>
);
