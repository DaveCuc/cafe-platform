import React, { useState, useEffect } from 'react';
import { CourseSidebar } from "./CourseSidebar";
import { CourseNavbar } from "./CourseNavbar";
import { Sun, Moon } from "lucide-react";

export function CourseLayout({ children, course, progressCount, currentChapterId, currentExamId, purchase, hideSidebar = false }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem('course_dark_mode');
        if (stored === 'true') setIsDarkMode(true);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        sessionStorage.setItem('course_dark_mode', (!isDarkMode).toString());
    };
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`h-full min-h-screen relative font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] text-gray-100' : 'bg-brand-pale text-brand-ink'}`}>
        <div className={`h-[80px] ${hideSidebar ? '' : 'md:pl-80'} fixed inset-y-0 w-full z-50`}>
          <CourseNavbar course={course} progressCount={progressCount} currentChapterId={currentChapterId} purchase={purchase} />
        </div>
        {!hideSidebar && (
          <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 border-r dark:border-brand-soft/20">
          <CourseSidebar 
              course={course} 
              progressCount={progressCount} 
              currentChapterId={currentChapterId}
              currentExamId={currentExamId}
              purchase={purchase}
          />
        </div>
      )}
        <main className={`${hideSidebar ? '' : 'md:pl-80'} pt-[80px] h-full overflow-y-auto`}>
          {children}
        </main>
        
        <button
            onClick={toggleDarkMode}
            className={`fixed bottom-8 right-8 p-3 shadow-xl z-50 transition-all duration-200 flex items-center justify-center border-2 ${isDarkMode ? 'bg-brand-mint text-white border-brand-mint hover:bg-white hover:text-brand-mint hover:border-brand-mint' : 'bg-brand text-white border-brand hover:bg-white hover:text-brand hover:border-brand'}`}
            title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
