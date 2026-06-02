import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Olvidé mi contraseña" />

            <div className="mb-4 text-sm text-brand-ink">
                ¿Olvidaste tu contraseña? No te preocupes. Déjanos tu correo
                electrónico y te enviaremos un enlace para restablecer tu
                contraseña y elegir una nueva.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="rounded-none text-sm text-brand-ink underline hover:text-brand-text focus:outline-none focus:ring-0"
                    >
                        Volver a iniciar sesión
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar enlace de restablecimiento
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
