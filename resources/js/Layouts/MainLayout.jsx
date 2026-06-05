import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Layout, Compass, List, LogOut, Menu, Store, FileText, Mail, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import Dropdown from '@/Components/Dropdown';
import { Button } from "@/Components/ui/button";

const Logo = () => (
    <img src="/logo.svg" alt="Logo" className="h-[60px] w-auto mx-auto" onError={(e) => { e.target.src = '/logo.svg'; }} />
);

const guestRoutes = [
    { icon: Layout, label: "Mi cursos", href: "/dashboard" },
    { icon: Compass, label: "Explorar mas cursos", href: "/search" },
    { icon: Store, label: "Mi negocio", href: "/trade" },
    { icon: Compass, label: "Descubrir", href: "/discover" },
];

const teacherRoutes = [
    { icon: List, label: "Cursos", href: "/teacher/courses" },
    { icon: Mail, label: "Solicitudes", href: "/teacher/solicitudes" },
    { icon: FileText, label: "Enlaces de interés", href: "/teacher/articles" },
    { icon: Calendar, label: "Eventos", href: "/teacher/events" },
];

const SidebarItem = ({ icon: Icon, label, href }) => {
    const { url } = usePage();
    const isTradeRoute = href === "/trade" && (url === "/trade" || url.startsWith("/directory/trades"));
    const isActive = isTradeRoute || url === href || url.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-x-2 text-brand-text text-base font-[500] pl-6 transition-all hover:text-white hover:bg-brand-text w-full",
                isActive && "text-brand-text bg-white hover:bg-brand-pale hover:text-brand-text"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-brand-text", isActive && "text-brand-text")} />
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-brand-text h-full transition-all", isActive && "opacity-100")} />
        </Link>
    );
};

const SidebarRoutes = () => {
    const { url, props } = usePage();
    const isTeacherRoute = url.startsWith("/teacher");
    const isTeacher = props?.auth?.user?.is_teacher;
    const routes = isTeacherRoute && isTeacher ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
            ))}
        </div>
    );
};

const Sidebar = () => (
    <div className="h-full border-r flex flex-col overflow-auto bg-brand-panel shadow-sm">
        <div className="p-4 flex justify-center">
            <Link href="/dashboard">
                <Logo />
            </Link>
        </div>
        <div className="flex flex-col w-full mt-4">
            <SidebarRoutes />
        </div>
    </div>
);

const MobileSidebar = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-64">
            <SheetTitle className="hidden">Menú del curso</SheetTitle>
            <Sidebar />
        </SheetContent>
    </Sheet>
);

const NavbarRoutes = () => {
    const { url, props } = usePage();
    const { auth } = props;
    const isTeacherRoute = url.startsWith("/teacher");
    const isPlayerPage = url.includes("/courses");
    const isTeacher = auth?.user?.is_teacher;

    return (
        <div className="flex gap-x-2 ml-auto items-center">
            {isTeacherRoute || isPlayerPage ? (
                <Link href="/dashboard">
                    <Button size="sm" variant="ghost" className={isTeacherRoute ? "text-white hover:bg-white/20 hover:text-white" : ""}>
                        <LogOut className="h-4 w-4 mr-2" /> Salir del Modo
                    </Button>
                </Link>
            ) : isTeacher ? (
                <Link href="/teacher/courses">
                    <Button size="sm" className="bg-brand-darker text-white hover:bg-brand font-bold">
                        Modo Profesor
                    </Button>
                </Link>
            ) : null}

            <div className="relative ml-2">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-none">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-none border border-transparent bg-white px-3 py-2 text-base font-medium leading-4 text-brand-ink hover:text-brand-text focus:outline-none"
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

import { ConfettiProvider } from "@/Components/providers/confetti-provider";

export default function MainLayout({ children }) {
    const { url } = usePage();
    const isTeacherRoute = url.startsWith("/teacher");

    return (
        <div className="h-full min-h-screen relative bg-brand-pale font-sans">
            <ConfettiProvider />
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <div className={cn("p-4 border-b h-full flex items-center shadow-sm transition-colors", isTeacherRoute ? "bg-brand text-white border-brand-darker" : "bg-white")}>
                    <MobileSidebar />
                    <NavbarRoutes />
                </div>
            </div>

            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            <main className="md:pl-56 pt-[80px] h-full p-6">
                {children}
            </main>
        </div>
    );
}
