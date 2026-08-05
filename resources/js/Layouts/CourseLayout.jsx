import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LogOut, Menu, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import Dropdown from '@/Components/Dropdown';
import { Button } from "@/Components/ui/button";
import { CourseSidebar } from "@/Pages/Course/Components/CourseSidebar";
import { ConfettiProvider } from "@/Components/providers/confetti-provider";

const NavbarRoutes = () => {
    const { auth } = usePage().props;

    return (
        <div className="flex gap-x-2 ml-auto items-center">
            <Link href="/dashboard">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" /> Salir del Curso
                </Button>
            </Link>

            <div className="relative ml-2">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-none border border-transparent bg-white dark:bg-[#252525] px-3 py-2 text-sm font-medium leading-4 text-brand-ink dark:text-gray-100 hover:text-brand-text focus:outline-none transition-colors"
                            >
                                {auth?.user?.name || "Usuario"}
                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right">
                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Cerrar Sesión
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
};

const CourseMobileSidebar = ({ course, progressCount, purchase }) => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white dark:bg-[#252525] w-72 border-r-0">
            <SheetTitle className="hidden">Menú del curso</SheetTitle>
            <CourseSidebar course={course} progressCount={progressCount} purchase={purchase} />
        </SheetContent>
    </Sheet>
);

const CourseNavbar = ({ course, progressCount, purchase }) => {
    return (
        <div className="p-4 border-b dark:border-brand-soft/20 h-full flex items-center bg-white dark:bg-[#252525] shadow-sm transition-colors">
            <CourseMobileSidebar course={course} progressCount={progressCount} purchase={purchase} />
            <NavbarRoutes />
        </div>
    );
};

export default function CourseLayout({ children, course, progressCount, purchase }) {
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
            <div className={`h-full min-h-screen relative font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] text-gray-100' : 'bg-gray-50'}`}>
                <ConfettiProvider />
                <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                    <CourseNavbar course={course} progressCount={progressCount} purchase={purchase} />
                </div>
                
                <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 border-r dark:border-brand-soft/20">
                    <CourseSidebar course={course} progressCount={progressCount} purchase={purchase} />
                </div>
                
                <main className="md:pl-80 pt-[80px] h-full">
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
    );
}
