import React from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';

import HeroSection from './Components/HeroSection';
import NewsSection from './Components/NewsSection';
import MapSection from './Components/MapSection';
import ConocenosSection from './Components/ConocenosSection';
import CursosSection from './Components/CursosSection';



export default function Welcome({ recentEvents }) {
    return (
        <HomeLayout>
            <Head title="Inicio" />

            <HeroSection />

            {/* <VideoSection /> */}

            <NewsSection recentEvents={recentEvents} />

            <MapSection />

            <ConocenosSection />

            <CursosSection />


        </HomeLayout>
    );
}
