import { Head, useForm, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function CreateCourse() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post('/teacher/courses');
  };

  return ( 
    <MainLayout>
      <Head title="Crear Curso" />
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-10">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-soft">
          <h1 className="text-2xl font-bold">Nombra tu curso</h1>
          <p className="text-sm text-brand-ink mt-2">
            ¿Cómo te gustaría llamar a tu curso? No te preocupes, puedes cambiarlo más tarde.
          </p>
          
          <form onSubmit={onSubmit} className="space-y-8 mt-8">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Título del curso</label>
                <Input
                    disabled={processing}
                    placeholder="Ej. 'Tostado de Café Especial'"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  className="focus-visible:ring-brand-ring"
                />
                <p className="text-[0.8rem] text-brand-ink">¿Qué enseñarás en este curso?</p>
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>
              
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
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
