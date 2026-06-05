import HomeLayout from "@/Layouts/HomeLayout";
import HeroSection from "./Components/HeroSection";
import SummarySection from "./Components/SummarySection";
import ActivitysSection from "./Components/ActivitysSection";
import DescriptionSection from "./Components/DescriptionSection";
import { CertificateSection } from "./Components/CertificateSection";
import { Head } from "@inertiajs/react";

export default function Negocio({ trade }) {
    if (!trade) return null;

    return (
        <HomeLayout>
            <Head title={trade.comercial_name || "Negocio"} />
            <div>
                <HeroSection trade={trade} />
                <SummarySection trade={trade} />
                <ActivitysSection activities={trade.activities} />
                <CertificateSection certificates={trade.certificates} />
                <DescriptionSection trade={trade} />
            </div>
        </HomeLayout>
    );
}
