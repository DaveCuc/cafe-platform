import { Head, useForm, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function CreateArticle() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post('/teacher/articles');
  };

  return ( 
    <MainLayout>
      <Head title="Crear Enlace de Interés" />
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-10">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-soft">
          <h1 className="text-2xl font-bold">Nombra tu enlace de interés</h1>
          <p className="text-sm text-brand-ink mt-2">
            ¿De qué tratará este enlace de interés? No te preocupes, puedes cambiar el título más tarde.
          </p>
          
          <form onSubmit={onSubmit} className="space-y-8 mt-8">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Título del enlace de interés</label>
                <Input
                    disabled={processing}
                    placeholder="Ej. 'Turismo Sostenible en México'"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  className="focus-visible:ring-brand-ring"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>
              
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/articles">
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={!data.title || processing}>
                Continuar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
