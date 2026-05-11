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
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};

const imageModules = import.meta.glob('/public/Directorios/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));

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
        <section className="bg-brand-nine py-20">
            <div className=" container mx-auto text-center px-4">
                <motion.div {...fadeUp}>
                    <h1 className="text-white text-3xl md:text-6xl font-bold mb-6">¿Quieres aparecer?</h1>
                </motion.div>
                <motion.div {...fadeUp}>
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-brand-text text-white rounded-md"
                        onClick={() => router.visit("/trade")}
                    >
                        Regístrate Aquí
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

const ResultadoSection = () => {
    const { url } = usePage();
    // Next uses useSearchParams, in Inertia we use props or URL directly, but for now we maintain API calls
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

                // Mantiene el llamado a API que migraremos a un Laravel Controller en la siguiente fase
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
        <section className="bg-brand-seven p-10">
            <div className=" p-5  py-15 ">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp}>
                        <div className="text-center mb-12 ">
                            <h2 className="text-6xl font-bold text-white">Resultados de búsqueda</h2>
                        </div>
                    </motion.div>
                    {!hasSearch ? (
                        <motion.div {...fadeUp}>
                            <p className="text-white text-center font-medium text-2xl">Selecciona una opción y presiona "Buscar ahora" para ver resultados.</p>
                        </motion.div>
                    ) : isLoading ? (
                        <motion.div {...fadeUp}>
                            <p className="text-white text-center font-medium">Buscando resultados...</p>
                        </motion.div>
                    ) : items.length === 0 ? (
                        <motion.div {...fadeUp}>
                            <p className="text-white text-center font-medium">No se encontraron resultados con esos filtros.</p>
                        </motion.div>
                    ) : (
                        <motion.div {...fadeUp}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {items.map((item, index) => {
                                    const giros = getItemGiros(item);
                                    const imageUrl = getItemImage(item, index);

                                    return (
                                        <Card key={item.id || item.email || index} className="group relative min-h-[500px] overflow-hidden rounded-[28px] border-0 bg-black shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                                            <img
                                                src={imageUrl}
                                                alt={item.comercial_name || item.name || "Directorio local"}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/75 to-black/10" />

                                            <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    {giros.length > 0 ? (
                                                        giros.map((giro) => (
                                                            <Badge
                                                                key={`${item.id || item.email || index}-${giro}`}
                                                                variant="outline"
                                                                className="w-fit rounded-full border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                                                            >
                                                                {giro}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="w-fit rounded-full border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                                                        >
                                                            Sin giro
                                                        </Badge>
                                                    )}
                                                </div>

                                                <CardTitle className="mb-3 text-2xl font-bold leading-tight text-white line-clamp-3">
                                                    {item.comercial_name || item.name}
                                                </CardTitle>

                                                <p className="mb-5 text-sm leading-6 text-white/90 line-clamp-3">
                                                    {item.descripcion_corta || item.descripcion || "Sin descripción"}
                                                </p>

                                                <CardContent className="grid gap-2 p-0 text-sm text-white/90">
                                                    <p className="line-clamp-1">
                                                        <span className="font-semibold text-white">Dirección:</span> {item.address || "No disponible"}
                                                    </p>
                                                    <p className="line-clamp-1">
                                                        <span className="font-semibold text-white">Teléfono:</span> {item.phone || "No disponible"}
                                                    </p>
                                                    <p className="break-all line-clamp-2">
                                                        <span className="font-semibold text-white">Email:</span> {item.email || "No disponible"}
                                                    </p>
                                                </CardContent>
                                                <div className="mt-6">
                                                    <Button
                                                        onClick={() => router.visit(`/negocio/${item.id}`)}
                                                        className="w-full bg-brand-ring hover:bg-brand text-white font-semibold rounded-xl"
                                                    >
                                                        Ver Negocio
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                </div>
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
                            <h1 className="text-5xl md:text-8xl font-extrabold mb-4">Reserva de la Biosfera</h1>
                            <h2 className="text-xl md:text-3xl font-sans mb-8">Todo en un solo lugar</h2>

                            <form onSubmit={onSubmit} className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg md:flex md:items-end md:gap-4 border border-white/20">
                                <div className="grow mb-4 md:mb-0 text-left">
                                    <h5 className="font-bold text-white mb-2">Categoría</h5>
                                    <Select value={selectedGiro} onValueChange={setSelectedGiro}>
                                        <SelectTrigger className="w-full p-4 h-12 rounded-2xl border-0 text-brand-text bg-white focus:ring-4 focus:ring-brand-ring">
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categoria</SelectLabel>
                                                <SelectItem value="default">Despliega la lista completa</SelectItem>
                                                <SelectItem value="all">Todas</SelectItem>
                                                <SelectItem value="Transporte Comunitario">Transporte Comunitario</SelectItem>
                                                <SelectItem value="Talleres comunitarios">Talleres comunitarios</SelectItem>
                                                <SelectItem value="Medicina tradicional y bienestar">Medicina tradicional y bienestar</SelectItem>
                                                <SelectItem value="Parques temáticos comunitarios">Parques temáticos comunitarios</SelectItem>
                                                <SelectItem value="Actividades acuáticas comunitarias">Actividades acuáticas comunitarias</SelectItem>
                                                <SelectItem value="Actividades de Aventura o Naturaleza">Actividades de Aventura o Naturaleza</SelectItem>
                                                <SelectItem value="Hospedaje comunitario">Hospedaje comunitario</SelectItem>
                                                <SelectItem value="Balneario y Parque Acuático">Balneario y Parque Acuático</SelectItem>
                                                <SelectItem value="Gastronomía tradicional">Gastronomía tradicional</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grow mb-4 md:mb-0 text-left">
                                    <h5 className="font-bold text-white mb-2">Región</h5>
                                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="w-full p-4 h-12 rounded-2xl border-0 text-brand-text bg-white focus:ring-4 focus:ring-brand-ring">
                                            <SelectValue placeholder="Selecciona una región" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Región</SelectLabel>
                                                <SelectItem value="default">Despliega la lista completa</SelectItem>
                                                <SelectItem value="all">Todas</SelectItem>
                                                <SelectItem value="REGIÓN SEPTENTRIONAL">Región Septentrional</SelectItem>
                                                <SelectItem value="REGIÓN DEL VALLE ZAPOTITLÁN-TEHUACÁN">Región del Valle Zapotitlán-Tehuacán</SelectItem>
                                                <SelectItem value="REGIÓN SIERRA NEGRA">Región Sierra Negra</SelectItem>
                                                <SelectItem value="REGIÓN CHAZUMBA">Región Chazumba</SelectItem>
                                                <SelectItem value="DISTRITO 3">Distrito 3</SelectItem>
                                                <SelectItem value="DISTRITO 4">Distrito 4</SelectItem>
                                                <SelectItem value="DISTRITO 5">Distrito 5</SelectItem>
                                                <SelectItem value="DISTRITO 10">Distrito 10</SelectItem>
                                                <SelectItem value="DISTRITO 11">Distrito 11</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    type="submit"
                                    onClick={scrollToResults}
                                    className="h-12 w-full md:w-auto px-8 bg-brand-ring hover:bg-brand text-white rounded-2xl font-bold"
                                >
                                    Buscar ahora
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
