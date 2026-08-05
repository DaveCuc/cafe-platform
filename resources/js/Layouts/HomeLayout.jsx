import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

export const LogoTecnm = ({ isScrolled = false, className = "" }) => (
    <img
        src={isScrolled ? "/Institution/tecnm.png" : "/Institution/tecnm-white.png"}
        alt="Logo"
        className={cn("h-[50px] w-auto transition-all", className)}
    />
);

export const LogoITT = ({ isScrolled = false, className = "" }) => (
    <img
        src={isScrolled ? "/Institution/itt.png" : "/Institution/itt-white.png"}
        alt="Logo"
        className={cn("h-[50px] w-auto transition-all", className)}
    />
);

export const LogoSecihti = ({ isScrolled = false, className = "" }) => (
    <img
        src={isScrolled ? "/Institution/secihti.png" : "/Institution/secihti-white.png"}
        alt="Logo"
        className={cn("h-[50px] w-auto transition-all", className)}
    />
);
export const Logo = ({ isScrolled = false, className = "" }) => (
    <img
        src={isScrolled ? "/logo.svg" : "/logo2.svg"}
        alt="Logo"
        className={cn("h-[50px] w-auto transition-all", className)}
    />
);

import BubbleTC from "@/Components/BubbleTC";
const HomeNavbarRoutes = ({ isScrolled }) => {
    const linkClass = cn(
        "transition-all duration-200 font-medium",
        isScrolled
            ? "text-brand-dark hover:text-white hover:bg-brand" // Scroll oscuro
            : "text-white hover:bg-white/20 hover:text-white"      // Top transparente
    );

    return (
        <div className="flex items-center justify-between w-full gap-x-6 px-4 max-w-7xl mx-auto">
            <Sheet>
                <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-black/10 transition">
                    <Menu className={cn("h-5 w-5", isScrolled ? "text-brand-dark" : "text-white")} />
                </SheetTrigger>
                <SheetContent side="left" className="p-6 bg-white w-72">
                    <SheetTitle className="sr-only">Menu principal</SheetTitle>
                    <div className="flex flex-col gap-2 mt-6">
                        <Link href="/" className="px-3 py-2 rounded-md text-brand-dark hover:bg-brand hover:text-white transition">Inicio</Link>
                        <Link href="/mapa" className="px-3 py-2 rounded-md text-brand-dark hover:bg-brand hover:text-white transition">Mapa</Link>
                        <Link href="/directorio" className="px-3 py-2 rounded-md text-brand-dark hover:bg-brand hover:text-white transition">Directorio</Link>
                        <Link href="/cursos" className="px-3 py-2 rounded-md text-brand-dark hover:bg-brand hover:text-white transition">Cursos</Link>
                    </div>
                    <div className="mt-6">
                        <Button asChild className="w-full bg-brand text-white hover:bg-brand-dark">
                            <Link href="/login">Acceder</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex-shrink-0">
                <Link href="/" className="inline-flex items-center focus:outline-none">
                    {/*<Logo isScrolled={isScrolled} /> */}

                </Link>
                <div className="inline-flex items-center focus:outline-none" >
                    <a href="https://secihti.mx/" target="_blank" rel="noopener noreferrer" className="pr-2 block hover:opacity-80 transition-opacity">
                        <LogoSecihti isScrolled={isScrolled} />
                    </a>
                    <a href="https://www.tecnm.mx/" target="_blank" rel="noopener noreferrer" className="pr-2 block hover:opacity-80 transition-opacity">
                        <LogoTecnm isScrolled={isScrolled} />
                    </a>
                    <a href="http://www.ittehuacan.edu.mx/" target="_blank" rel="noopener noreferrer" className="pr-2 block hover:opacity-80 transition-opacity">
                        <LogoITT isScrolled={isScrolled} />
                    </a>
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-x-2 flex-1 justify-center">
                <Button asChild variant="ghost" className={linkClass}><Link href="/">Inicio</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/mapa">Mapa</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/directorio">Directorio</Link></Button>
                <Button asChild variant="ghost" className={linkClass}><Link href="/cursos">Cursos</Link></Button>
            </nav>

            <div className="flex-shrink-0 flex gap-2">
                <Button
                    asChild
                    className={cn(
                        "shadow-md hover:shadow-lg transition-all duration-100 font-semibold px-6",
                        isScrolled
                            ? "bg-brand text-white hover:bg-brand-dark"
                            : "bg-white text-brand hover:bg-brand-pale"
                    )}
                >
                    <Link href="/login">Acceder</Link>
                </Button>
            </div>
        </div>
    );
};

export const HomeNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    const currentPath = url.split("?")[0];
    const isAlwaysSolid = currentPath === "/mapa" || currentPath.startsWith("/eventos") || currentPath === "/cursos" || currentPath.startsWith("/articulos");

    useEffect(() => {
        if (isAlwaysSolid) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAlwaysSolid]);

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300">
            <div
                className={cn(
                    "p-4 h-[80px] flex items-center transition-all duration-300",
                    isScrolled ? "bg-white border-b shadow-sm" : "bg-transparent border-transparent"
                )}
            >
                <HomeNavbarRoutes isScrolled={isScrolled} />
            </div>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white py-2 p-5 pb-8 px-8 mt-auto z-10 relative">
            <div className="container mx-auto max-w-7xl pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-flex items-center mb-4 focus:outline-none">
                            <Logo isScrolled={false} />
                        </Link>
                        <p className="text-sm text-white/80 mb-4">
                            Modelo de Clúster para la Caficultura de la Sierra Negra de Puebla: Diseño, análisis territorial y propuesta estratégica para una cadena de valor competitiva y sostenible.
                        </p>
                        <p className="text-xs text-white/60 mb-6 leading-relaxed">
                            <b>Investigadores:</b> Iniria Guevara Ramírez, Iván Áraoz Baltazar, Jose Luis Ruan Cervantes, Oscar Del Angel Medina, Dulce María Osio Sánchez.
                        </p>
                        © Todos los derechos reservados {new Date().getFullYear()}

                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Navegación</h3>
                        <div className="flex flex-col space-y-3">
                            <Link href="/mapa" className="text-white hover:text-brand-light transition">Mapa</Link>
                            <Link href="/directorio" className="text-white hover:text-brand-light transition">Directorio</Link>
                            <Link href="/cursos" className="text-white hover:text-brand-light transition">Cursos</Link>
                            <Link href="/register" className="text-white hover:text-brand-light transition">Regístrate</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Nosotros</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="http://www.ittehuacan.edu.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-light transition"><b>Instituto Tecnológico de Tehuacán</b></a>
                            <a href="https://www.tecnm.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-light transition"><b>Tecnológico Nacional de México</b> (TECNM)</a>
                            <a href="https://secihti.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-light transition"><b>Secretaría de Ciencia, Humanidades, Tecnología e Innovación</b> (SECIHTI)</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-brand-pale">
            <HomeNavbar />

            <main className="flex-grow relative">
                {children}
            </main>

            <BubbleTC />

            <Footer />
        </div>
    );
}
