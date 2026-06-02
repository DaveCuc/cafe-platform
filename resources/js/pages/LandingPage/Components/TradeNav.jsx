import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = {
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

const ICONS = {
    "Todos": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    "Transporte Comunitario": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
    "Talleres comunitarios": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>,
    "Medicina tradicional y bienestar": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    "Parques temáticos comunitarios": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    "Actividades acuáticas comunitarias": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    "Actividades de Aventura o Naturaleza": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    "Hospedaje comunitario": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    "Balneario y Parque Acuático": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    "Gastronomía tradicional": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
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
                    className="absolute top-20 md:top-24 left-1/2 z-[500] pointer-events-auto flex flex-col justify-center items-center bg-white/95 backdrop-blur-md p-3 rounded-none shadow-xl border border-gray-100 w-[95vw] md:w-[85vw] max-w-7xl"
                >
                    <div className="flex flex-wrap justify-center items-center gap-2 w-full">
                        {/* Title & Toggle */}
                        <div className="flex items-center gap-2 mr-2">
                            <span className="font-extrabold text-brand-darker uppercase tracking-widest text-xs">Filtros</span>
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center justify-center p-1.5 rounded-none bg-gray-100 text-gray-600 hover:bg-brand hover:text-white border-2 border-gray-200 hover:border-brand transition-colors"
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
                                    className={`whitespace-nowrap flex items-center gap-2 px-3 py-1.5 rounded-none text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border-2 ${isActive ? 'text-white shadow-md scale-105' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:scale-105'} ${!isExpanded && !isActive ? 'hidden' : 'flex'}`}
                                    style={isActive ? { 
                                        backgroundColor: color,
                                        borderColor: color
                                    } : {
                                        color: color
                                    }}
                                >
                                    <span className="shrink-0">{ICONS[name]}</span>
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