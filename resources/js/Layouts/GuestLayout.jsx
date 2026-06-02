import Background from '@/Components/Background';
import { Logo } from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f4f6f1] px-4 py-8 sm:px-6 lg:px-8">
            <Background />
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <section className="w-full max-w-md overflow-hidden rounded-none bg-white shadow-xl ring-0">
                    <div className="flex justify-center border-0 bg-brand px-6 py-5 sm:px-8">
                        <Link href="/" className="inline-flex items-center justify-center">
                            <Logo isScrolled={false} className="h-[120px] w-auto" />
                        </Link>
                    </div>
                    <h2 className="mt-4 px-6 py-3 text-center text-2xl font-semibold tracking-tight text-brand-earth sm:px-8">
                        Inicia sesión para continuar
                    </h2>

                    <div className="px-6 py-6 sm:px-8">{children}</div>
                </section>
            </div>
        </div>
    );
}
