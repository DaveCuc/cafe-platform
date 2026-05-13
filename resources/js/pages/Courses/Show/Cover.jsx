import { Head, Link } from "@inertiajs/react";
import { CourseLayout } from "./Components/CourseLayout";
import { CourseEnrollButton } from "./Components/CourseButtons";
import { Button } from "@/Components/ui/button";

const Preview = ({ value }) => (
  <div className="prose max-w-none text-gray-600 mt-2 text-lg" dangerouslySetInnerHTML={{ __html: value }} />
);

export default function CourseCover({
  course,
  purchase,
  firstChapter,
  progressCount,
}) {
  return (
    <CourseLayout
      course={course}
      progressCount={progressCount}
      currentChapterId={null}
      purchase={purchase}
    >
      <Head title={course.title} />

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <div className="relative aspect-video rounded-md overflow-hidden bg-slate-100 flex flex-col justify-center items-center">
            {course.image_url ? (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-slate-500">Sin foto de portada</div>
            )}
          </div>
        </div>
        
        <div className="p-4 flex flex-col items-start space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            {course.category && (
              <span className="inline-block bg-brand-pale text-brand-strong px-2 py-1 rounded-md text-sm font-semibold mb-2">
                {course.category.name}
              </span>
            )}
            <Preview value={course.description || "Sin descripción"} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            {purchase ? (
              <>
                <Button disabled variant="outline" className="opacity-75 cursor-not-allowed">
                  Inscrito
                </Button>
                {firstChapter && (
                  <Link href={route("courses.chapters.show", { course: course.id, chapter: firstChapter.id })}>
                    <Button>
                      Comenzar
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <CourseEnrollButton
                courseId={course.id}
                price={course.price}
                isFree={course.is_free}
              />
            )}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
}
