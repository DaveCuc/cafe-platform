import { Head } from "@inertiajs/react";
import { File } from "lucide-react";
import { CourseLayout } from "./Components/CourseLayout";
import { VideoPlayer } from "./Components/VideoPlayer";
import { CourseEnrollButton, CourseProgressButton } from "./Components/CourseButtons";
import { Separator } from "@/Components/ui/separator";
import { Banner } from "@/Components/banner";

// Mock simple de validación WYSIWYG
const Preview = ({ value }) => (
  <div className="prose max-w-none text-brand-text mt-4" dangerouslySetInnerHTML={{ __html: value }} />
);

export default function CourseShow({
  course,
  chapter,
  attachments,
  nextChapter,
  userProgress,
  purchase,
  isLocked,
  progressCount,
}) {
  const isCompleted = !!userProgress?.is_completed;
  const completeOnEnd = !isCompleted;

  return (
    <CourseLayout course={course} progressCount={progressCount} currentChapterId={chapter.id} purchase={purchase}>
      <Head title={chapter.title} />

      {isCompleted && (
        <Banner variant="successSolid" label="Ya completaste este capítulo." />
      )}
      {isLocked && (
        <Banner variant="warningSolid" label="Necesitas comprar este curso para ver este capítulo." />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {isLocked ? (
            <div className="relative aspect-video rounded-md overflow-hidden bg-black flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center text-white space-y-2">
                <span className="font-semibold">CapÃtulo Bloqueado</span>
                <span className="text-sm">InscrÃbete para acceder al contenido.</span>
              </div>
            </div>
          ) : chapter.video_url || chapter.is_video_required ? (
            <VideoPlayer
              chapterId={chapter.id}
              title={chapter.title}
              courseId={course.id}
              nextChapterId={nextChapter?.id}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
              videoUrl={chapter.video_url}
            />
          ) : chapter.image_url ? (
            <div className="relative aspect-video rounded-md overflow-hidden bg-black flex flex-col justify-center items-center">
              <img src={chapter.image_url} alt={chapter.title} className="w-full h-full object-cover" />
            </div>
          ) : null}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={chapter.id}
                courseId={course.id}
                nextChapterId={nextChapter?.id}
                isCompleted={isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={course.id} price={course.price} isFree={course.is_free} />
            )}
          </div>
          <Separator />
          <div className="p-4">
            <Preview value={chapter.description || "Sin descripción"} />
            {!isLocked && (chapter.video_url || chapter.is_video_required) && chapter.image_url && (
              <div className="mt-6 relative aspect-video rounded-md overflow-hidden bg-black flex flex-col justify-center items-center">
                <img src={chapter.image_url} alt={chapter.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          {attachments?.length > 0 && (
            <>
              <Separator />
              <div className="p-4 space-y-2">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-brand-pale border border-brand-soft text-brand-text rounded-md hover:underline"
                  >
                    <File className="h-4 w-4 mr-2" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </CourseLayout>
  );
}
