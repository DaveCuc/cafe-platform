import React, { useEffect, useMemo, useState } from "react";
import { Head, router, usePage } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Carousel, CarouselContent, CarouselItem } from "@/Components/ui/carousel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

/*
// Extracción de imágenes de forma local (Original)
const imageModules = import.meta.glob('/public/Directorios/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));
*/

// Imágenes de productores y fincas cafetaleras de la Sierra Negra desde Internet
const carouselImages = [
    "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=1920", // Cosecha manual de café de especialidad
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920", // Granos de café en planta
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1920", // Fincas y plantaciones de café
    "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1920"  // Café seleccionado y secado
];

const getSearchParamsFromUrl = (url) => {
    const query = url.includes("?") ? url.split("?")[1] : "";
    return new URLSearchParams(query);
};

const splitGiroValues = (value) => {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value
            .flatMap((entry) => splitGiroValues(entry))
            .filter(Boolean);
    }

    if (typeof value === "object") {
        return splitGiroValues(value.name || value.giro || value.title);
    }

    return String(value)
        .split(/[,/|;]/)
        .map((entry) => entry.trim())
        .filter(Boolean);
};

const getItemGiros = (item) => {
    const giroValues = [
        ...splitGiroValues(item?.giros),
        ...splitGiroValues(item?.giro),
    ];

    return Array.from(new Set(giroValues));
};

const getItemImage = (item, index) => item?.image_url || item?.imageUrl || `https://picsum.photos/1200/900?random=${index + 1}`;

const RegistroSection = () => {
    return (
        <section className="bg-brand-dark py-24 border-t border-brand-darker">
            <div className="container mx-auto text-center px-4 max-w-4xl">
                <motion.div {...fadeUp}>
                    <span className="inline-block text-white/90 font-semibold tracking-widest text-sm uppercase mb-4 border-b border-white/40 pb-1">Súmate a la Red</span>
                    <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 tracking-tight">¿Quieres aparecer en nuestro directorio?</h2>
                    <p className="text-white text-lg mb-10 max-w-2xl mx-auto font-light">
                        Registra tu negocio, finca o tienda de café y conecta directamente con clientes, tostadores y proveedores interesados en la producción de la Sierra Negra.
                    </p>
                </motion.div>
                <motion.div {...fadeUp}>
                    <Button
                        size="lg"
                        className="rounded-none bg-brand-mint text-white border-2 border-brand-mint hover:bg-white hover:text-brand-mint hover:border-brand-mint transition-all duration-300 px-10 py-6 text-sm font-semibold uppercase tracking-wide"
                        onClick={() => router.visit("/trade")}
                    >
                        Registrar Negocio
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

const ResultadoSection = () => {
    const { url } = usePage();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = useMemo(() => getSearchParamsFromUrl(url), [url]);
    const hasSearch = params.get("search") === "1" || params.has("giro") || params.has("region");

    useEffect(() => {
        if (!hasSearch) {
            setItems([]);
            setIsLoading(false);
            return;
        }

        const fetchDirectorio = async () => {
            try {
                setIsLoading(true);
                const queryString = params.toString();

                const response = await fetch(queryString ? `/api/directorio?${queryString}` : "/api/directorio");
                if (!response.ok) throw new Error("No se pudo cargar el directorio");

                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Error loading directorio:", error);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDirectorio();
    }, [hasSearch, params]);

    return (
        <section className="bg-brand-pale py-20 min-h-[50vh]">
            <div className="container mx-auto px-4 max-w-7xl" id="resultados-busqueda" data-resultados-busqueda>
                <motion.div {...fadeUp}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight mb-4">Resultados de Búsqueda</h2>
                        <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
                    </div>
                </motion.div>

                {!hasSearch ? (
                    <motion.div {...fadeUp}>
                        <p className="text-gray-600 text-center font-light text-xl p-12 bg-white border border-gray-200 institutional-shadow">
                            Selecciona una opción en el buscador para localizar caficultores, proveedores o tiendas en el clúster.
                        </p>
                    </motion.div>
                ) : isLoading ? (
                    <motion.div {...fadeUp}>
                        <div className="flex justify-center p-12">
                            <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
                        </div>
                    </motion.div>
                ) : items.length === 0 ? (
                    <motion.div {...fadeUp}>
                        <p className="text-gray-600 text-center font-light text-xl p-12 bg-white border border-gray-200 institutional-shadow">
                            No se encontraron productores, tiendas o proveedores con los filtros seleccionados.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div {...fadeUp}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item, index) => {
                                const giros = getItemGiros(item);
                                const imageUrl = getItemImage(item, index);

                                return (
                                    <Card key={item.id || item.email || index} className="group relative overflow-hidden rounded-none border border-gray-200 bg-white institutional-shadow hover:institutional-shadow-strong transition-all duration-300 flex flex-col h-full">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={item.comercial_name || item.name || "Directorio local"}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>

                                        <div className="relative z-10 flex flex-col flex-grow p-6 bg-white border-t border-gray-100">
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {giros.length > 0 ? (
                                                    giros.map((giro) => (
                                                        <Badge
                                                            key={`${item.id || item.email || index}-${giro}`}
                                                            variant="outline"
                                                            className="rounded-none border-brand text-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-brand-soft/30"
                                                        >
                                                            {giro}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-none border-gray-300 text-gray-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-50"
                                                    >
                                                        General
                                                    </Badge>
                                                )}
                                            </div>

                                            <CardTitle className="mb-3 text-xl font-bold leading-tight text-brand-dark line-clamp-2 group-hover:text-brand transition-colors duration-300">
                                                {item.comercial_name || item.name}
                                            </CardTitle>

                                            <p className="mb-6 text-sm leading-relaxed text-gray-600 line-clamp-2 flex-grow font-light">
                                                {item.descripcion_corta || item.descripcion || "Sin descripción disponible para esta iniciativa."}
                                            </p>

                                            <CardContent className="grid gap-2 p-0 text-sm text-gray-700 mb-6 font-light">
                                                <p className="line-clamp-1">
                                                    <span className="font-semibold text-brand-dark">Sede:</span> {item.address || "No disponible"}
                                                </p>
                                                <p className="line-clamp-1">
                                                    <span className="font-semibold text-brand-dark">Contacto:</span> {item.phone || "No disponible"}
                                                </p>
                                                <p className="break-all line-clamp-1">
                                                    <span className="font-semibold text-brand-dark">Email:</span> {item.email || "No disponible"}
                                                </p>
                                            </CardContent>

                                            <Button
                                                onClick={() => router.visit(`/negocio/${item.id}`)}
                                                className="w-full mt-auto rounded-none bg-brand text-white hover:bg-brand-dark transition-colors duration-300 py-6 text-sm font-semibold uppercase tracking-wide"
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

const BuscadorSection = () => {
    const { url } = usePage();
    const params = useMemo(() => getSearchParamsFromUrl(url), [url]);
    const hasSearch = params.get("search") === "1";
    const [selectedGiro, setSelectedGiro] = useState(params.get("giro") || (hasSearch ? "all" : "default"));
    const [selectedRegion, setSelectedRegion] = useState(params.get("region") || (hasSearch ? "all" : "default"));

    useEffect(() => {
        const isSearchTriggered = params.get("search") === "1";
        setSelectedGiro(params.get("giro") || (isSearchTriggered ? "all" : "default"));
        setSelectedRegion(params.get("region") || (isSearchTriggered ? "all" : "default"));
    }, [params]);

    const onSubmit = (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set("search", "1");
        if (selectedGiro && selectedGiro !== "all" && selectedGiro !== "default") searchParams.set("giro", selectedGiro);
        if (selectedRegion && selectedRegion !== "all" && selectedRegion !== "default") searchParams.set("region", selectedRegion);

        const queryString = searchParams.toString();
        // Recarga via Inertia
        router.visit(queryString ? `/directorio?${queryString}` : "/directorio", {
            preserveScroll: true
        });
    };

    const scrollToResults = () => {
        const resultsSection =
            document.getElementById("resultados-busqueda") ||
            document.querySelector("[data-resultados-busqueda]");

        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <div className="h-screen relative text-white flex justify-center">
            <Carousel plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]} className="absolute inset-0 w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                    {(carouselImages.length ? carouselImages : Array.from({ length: 5 }, (_, index) => `https://picsum.photos/1920/1080?random=${index + 1}`)).map((imageSrc, index) => (
                        <CarouselItem key={`${imageSrc}-${index}`}>
                            <div className="relative w-full h-screen">
                                <img
                                    src={imageSrc}
                                    alt={`Foto de galería ${index + 1}`}
                                    className="object-cover w-full h-full absolute inset-0"
                                    onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?random=' + index; }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
            </Carousel>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <motion.div {...fadeUp} className="relative z-10 w-full">
                <div className="h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl font-sans mb-2">Busca en nuestro Directorio</h2>
                            <h1 className="text-5xl md:text-8xl font-extrabold mb-4">Clúster Cafetalero</h1>
                            <h2 className="text-xl md:text-3xl font-sans mb-8">Proveedores, Tiendas de Café y Clientes</h2>

                            <form onSubmit={onSubmit} className="bg-white/95 backdrop-blur-md p-6 md:p-8 institutional-shadow-strong border border-gray-200 flex flex-col md:flex-row md:items-end gap-6 text-left mt-4 mx-auto max-w-5xl relative z-20">
                                <div className="grow">
                                    <label className="block font-semibold text-brand-dark text-sm uppercase tracking-wider mb-3">Categoría</label>
                                    <Select value={selectedGiro} onValueChange={setSelectedGiro}>
                                        <SelectTrigger className="w-full p-4 h-14 rounded-none border border-gray-300 text-gray-800 bg-white focus:ring-1 focus:ring-brand focus:border-brand transition-colors">
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none border-gray-200">
                                            <SelectGroup>
                                                <SelectLabel className="font-bold text-brand-dark">Categoría</SelectLabel>
                                                <SelectItem value="default" className="cursor-pointer">Despliega la lista completa</SelectItem>
                                                <SelectItem value="all" className="cursor-pointer">Todas</SelectItem>
                                                {/* Cadena productiva del café */}
                                                <SelectItem value="Productor de Café" className="cursor-pointer">Productor de Café</SelectItem>
                                                <SelectItem value="Beneficiador" className="cursor-pointer">Beneficiador</SelectItem>
                                                <SelectItem value="Tostador" className="cursor-pointer">Tostador</SelectItem>
                                                <SelectItem value="Comercializador" className="cursor-pointer">Comercializador</SelectItem>
                                                <SelectItem value="Tienda y Punto de Venta" className="cursor-pointer">Tienda y Punto de Venta</SelectItem>
                                                <SelectItem value="Cooperativa / Sociedad" className="cursor-pointer">Cooperativa / Sociedad</SelectItem>
                                                <SelectItem value="Transformación y Valor Agregado" className="cursor-pointer">Transformación y Valor Agregado</SelectItem>
                                                {/* ─── REFERENCIA PARA DESARROLLO FUTURO ───
                                                    Si se reutiliza este selector para turismo u otras ramas, descomentar como referencia:
                                                <SelectItem value="Transporte Comunitario" className="cursor-pointer">Transporte Comunitario</SelectItem>
                                                <SelectItem value="Talleres comunitarios" className="cursor-pointer">Talleres comunitarios</SelectItem>
                                                <SelectItem value="Medicina tradicional y bienestar" className="cursor-pointer">Medicina tradicional y bienestar</SelectItem>
                                                <SelectItem value="Parques temáticos comunitarios" className="cursor-pointer">Parques temáticos comunitarios</SelectItem>
                                                <SelectItem value="Actividades acuáticas comunitarias" className="cursor-pointer">Actividades acuáticas comunitarias</SelectItem>
                                                <SelectItem value="Actividades de Aventura o Naturaleza" className="cursor-pointer">Actividades de Aventura o Naturaleza</SelectItem>
                                                <SelectItem value="Hospedaje comunitario" className="cursor-pointer">Hospedaje comunitario</SelectItem>
                                                <SelectItem value="Balneario y Parque Acuático" className="cursor-pointer">Balneario y Parque Acuático</SelectItem>
                                                <SelectItem value="Gastronomía tradicional" className="cursor-pointer">Gastronomía tradicional</SelectItem>
                                                */}
                                            </SelectGroup>

                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grow">
                                    <label className="block font-semibold text-brand-dark text-sm uppercase tracking-wider mb-3">Región</label>
                                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="w-full p-4 h-14 rounded-none border border-gray-300 text-gray-800 bg-white focus:ring-1 focus:ring-brand focus:border-brand transition-colors">
                                            <SelectValue placeholder="Selecciona una región" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none border-gray-200">
                                            <SelectGroup>
                                                <SelectLabel className="font-bold text-brand-dark">Región</SelectLabel>
                                                <SelectItem value="default" className="cursor-pointer">Despliega la lista completa</SelectItem>
                                                <SelectItem value="all" className="cursor-pointer">Todas</SelectItem>
                                                <SelectItem value="REGIÓN SEPTENTRIONAL" className="cursor-pointer">Región Septentrional</SelectItem>
                                                <SelectItem value="REGIÓN DEL VALLE ZAPOTITLÁN-TEHUACÁN" className="cursor-pointer">Región del Valle Zapotitlán-Tehuacán</SelectItem>
                                                <SelectItem value="REGIÓN SIERRA NEGRA" className="cursor-pointer">Región Sierra Negra</SelectItem>
                                                <SelectItem value="REGIÓN CHAZUMBA" className="cursor-pointer">Región Chazumba</SelectItem>
                                                <SelectItem value="DISTRITO 3" className="cursor-pointer">Distrito 3</SelectItem>
                                                <SelectItem value="DISTRITO 4" className="cursor-pointer">Distrito 4</SelectItem>
                                                <SelectItem value="DISTRITO 5" className="cursor-pointer">Distrito 5</SelectItem>
                                                <SelectItem value="DISTRITO 10" className="cursor-pointer">Distrito 10</SelectItem>
                                                <SelectItem value="DISTRITO 11" className="cursor-pointer">Distrito 11</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    type="submit"
                                    onClick={scrollToResults}
                                    className="h-14 w-full md:w-48 px-8 bg-brand hover:bg-brand-dark text-white rounded-none font-semibold text-sm uppercase tracking-wide transition-colors duration-300"
                                >
                                    Buscar
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Directorio() {
    return (
        <HomeLayout>
            <Head title="Directorio Local" />
            <BuscadorSection />

            <ResultadoSection />

            <RegistroSection />

        </HomeLayout>
    );
}
