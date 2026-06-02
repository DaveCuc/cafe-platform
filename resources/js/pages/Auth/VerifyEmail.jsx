import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificación de correo" />

            <div className="mb-4 text-sm text-brand-ink">
                ¡Gracias por registrarte! Antes de comenzar, verifica tu
                correo electrónico haciendo clic en el enlace que te enviamos.
                Si no lo recibiste, con gusto te enviaremos otro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    Se ha enviado un nuevo enlace de verificación al correo
                    electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-8 flex flex-col gap-6">
                    <PrimaryButton disabled={processing} className="w-full justify-center text-center py-3 text-sm">
                        Reenviar correo de verificación
                    </PrimaryButton>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            href={route('login')}
                            className="rounded-none text-sm text-brand-ink underline hover:text-brand-text focus:outline-none focus:ring-0"
                        >
                            Volver a iniciar sesión
                        </Link>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-none text-sm text-brand-ink underline hover:text-brand-text focus:outline-none focus:ring-0"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
