"use client";

import { Logo } from "@/app/(dashboard)/_components/logo";
import { Logo as LogoWhite } from "@/app/(dashboard)/_components/logo"; 
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils"; 

interface HomeNavbarRoutesProps {
  isScrolled: boolean;
}

export const HomeNavbarRoutes = ({ isScrolled }: HomeNavbarRoutesProps) => {
    
    // Configuración de estilos para los Links
    const linkClass = cn(
        "transition-all duration-200 font-medium",
        isScrolled 
            ? "text-brand-text hover:text-white hover:bg-brand" // Scroll: Texto oscuro -> Hover verde
            : "text-white hover:bg-white/20 hover:text-white"      // Top: Texto blanco
    );

    return (
        <div className="pl-5 flex items-center justify-between w-full gap-x-6"> 
            
            {/* LOGO CAMBIANTE */}
            <div className="flex-shrink-0">
                <Link href="/inicio">
                    {isScrolled ? <Logo /> : <LogoWhite />}
                </Link>
            </div>
            
            {/* LINKS */}
            <nav className="hidden md:flex items-center gap-x-1 flex-1 justify-center">
                <Link href="/inicio"><Button variant="ghost" className={linkClass}>Inicio</Button></Link>
                <Link href="/mapa"><Button variant="ghost" className={linkClass}>Mapa</Button></Link>
                <Link href="/directorio"><Button variant="ghost" className={linkClass}>Directorio</Button></Link>
                <Link href="/cursos"><Button variant="ghost" className={linkClass}>Cursos</Button></Link>
            </nav>
            
            {/* BOTÓN LOGIN */}
            <div className="pr-5 flex-shrink-0">
                <Link href="/">
                    <Button 
                        className={cn(
                            "shadow-md hover:shadow-lg transition-all duration-100 font-semibold px-6",
                            isScrolled
                                ? "bg-brand text-white hover:bg-brand-dark" // Scroll: Verde
                                : "bg-white text-brand hover:bg-brand-pale" // Top: Blanco
                        )}
                    >
                        Iniciar Sesión
                    </Button>
                </Link>
            </div>
        </div>
    )
}