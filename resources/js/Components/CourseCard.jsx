import { Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/Components/icon-badge";

export const CourseProgress = ({ value, variant, size }) => (
  <div className="w-full bg-brand-pale dark:bg-gray-700 rounded-none h-2 mt-2 border-0">
    <div className="bg-brand-dark dark:bg-white h-2 rounded-none transition-all" style={{ width: `${value}%` }}></div>
  </div>
);

export const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(price);
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group bg-white dark:bg-[#252525] border-0 shadow-lg dark:shadow-xl hover:shadow-md hover:translate-y-1 transition-all overflow-hidden rounded-none flex flex-col h-full">
        <div className="relative w-full aspect-video rounded-none overflow-hidden bg-brand-pale dark:bg-black border-0">
          <img
            className="object-cover w-full h-full"
            alt={title}
            src={imageUrl || "https://picsum.photos/seed/course/800/600"}
          />
        </div>
        <div className="flex flex-col p-6 h-auto min-h-[10rem] flex-grow">
          <div className="text-xl md:text-2xl font-bold group-hover:text-brand transition text-brand-ink dark:text-white uppercase tracking-wide">
            {title}
          </div>
          <p className="text-sm font-semibold text-brand-ink/70 dark:text-gray-400 mt-2">
            {category}
          </p>
          <div className="my-4 flex items-center gap-x-2 text-sm font-semibold text-brand-ink dark:text-gray-300">
            <div className="flex items-center gap-x-1">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Capítulo" : "Capítulos"}
              </span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t-0">
            {progress !== null ? (
              <div className="w-full pt-2">
                 <p className="text-sm font-bold text-brand dark:text-white mb-2 uppercase tracking-wider">{Math.round(progress)}% Completado</p>
                 <CourseProgress
                   variant={progress === 100 ? "success" : "default"}
                   size="sm"
                   value={progress}
                 />
              </div>
            ) : (
              <p className="text-xl mt-2 font-black text-brand dark:text-white bg-brand-pale dark:bg-brand-dark p-2 text-center uppercase tracking-wider border-0">
                {formatPrice(price || 0)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
