import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Categorías de la cadena productiva del café ────────────────────────────
// Paleta elegante, armónica y de alto contraste (WCAG AA/AAA compliant)
const CATEGORIES = {
    "Todos":                          "#0F172A", // Dark Slate
    "Productor de Café":              "#15803D", // Deep Forest Green
    "Beneficiador":                   "#78350F", // Deep Roasted Coffee Brown
    "Tostador":                       "#991B1B", // Deep Crimson Red
    "Comercializador":                "#B45309", // Deep Warm Amber / Ocre
    "Tienda y Punto de Venta":         "#1E40AF", // Deep Navy Blue
    "Cooperativa / Sociedad":         "#6B21A8", // Deep Royal Purple
    "Transformación y Valor Agregado":"#0F766E", // Deep Teal
};

// ─── Referencia de ayuda para desarrollo / manipulación futura ───────────────
// Si en el futuro se desea reutilizar este componente para turismo u otro rubro,
// mantén las claves anteriores y descomenta este bloque como referencia de mapeo:
/*
const CATEGORIES_TURISMO_GUIA = {
    "Todos": "#1f2937",
    "Transporte Comunitario": "#FF7A5C",
    "Talleres comunitarios": "#00D126",
    "Medicina tradicional y bienestar": "#5C7AFF",
    "Parques temáticos comunitarios": "#FF8AC8",
    "Actividades acuáticas comunitarias": "#00D1C7",
    "Actividades de Aventura o Naturaleza": "#C7D100",
    "Hospedaje comunitario": "#C88AFF",
    "Balneario y Parque Acuático": "#FFA35C",
    "Gastronomía tradicional": "#00A347",
};
*/

// ─── Iconos SVG por categoría ────────────────────────────────────────────────
const ICONS = {
    "Todos": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    "Productor de Café": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    "Beneficiador": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
    ),
    "Tostador": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
    ),
    "Comercializador": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    "Tienda y Punto de Venta": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    ),
    "Cooperativa / Sociedad": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    "Transformación y Valor Agregado": (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    ),
};

const TradeNav = ({ capasActivas, activeCategories, setActiveCategories }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleToggleCategory = (category) => {
        if (category === "Todos") {
            setActiveCategories(["Todos"]);
            return;
        }

        let newCategories = [...activeCategories];
        
        if (newCategories.includes("Todos")) {
            newCategories = newCategories.filter(c => c !== "Todos");
        }

        if (newCategories.includes(category)) {
            newCategories = newCategories.filter(c => c !== category);
            if (newCategories.length === 0) {
                newCategories = ["Todos"];
            }
        } else {
            newCategories.push(category);
        }
        
        setActiveCategories(newCategories);
    };

    return (
        <AnimatePresence>
            {capasActivas?.negocios && (
                <motion.div 
                    initial={{ y: -80, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: -80, opacity: 0, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute top-20 md:top-24 left-1/2 z-[500] pointer-events-auto flex flex-col justify-center items-center bg-white/95 backdrop-blur-md p-3 rounded-none shadow-xl border border-gray-200 w-[95vw] md:w-[85vw] max-w-7xl"
                >
                    <div className="flex flex-wrap justify-center items-center gap-2 w-full">
                        {/* Title & Toggle */}
                        <div className="flex items-center gap-2 mr-2">
                            <span className="font-extrabold text-brand-darker uppercase tracking-widest text-xs">Filtros</span>
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center justify-center p-1.5 rounded-none bg-gray-100 text-gray-700 hover:bg-brand hover:text-white border border-gray-300 hover:border-brand transition-colors"
                                aria-label="Toggle filters"
                            >
                                <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {Object.entries(CATEGORIES).map(([name, color]) => {
                            const isActive = activeCategories.includes(name);
                            return (
                                <button
                                    key={name}
                                    onClick={() => handleToggleCategory(name)}
                                    className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-none text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border ${
                                        isActive 
                                            ? 'text-white shadow-md scale-105 border-transparent' 
                                            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:scale-102 shadow-xs'
                                    } ${!isExpanded && !isActive ? 'hidden' : 'flex'}`}
                                    style={isActive ? { 
                                        backgroundColor: color,
                                        borderColor: color
                                    } : {}}
                                >
                                    <span className="shrink-0" style={{ color: isActive ? '#FFFFFF' : color }}>
                                        {ICONS[name]}
                                    </span>
                                    <span>{name}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TradeNav;