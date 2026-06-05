import { Link } from "@inertiajs/react";
import { CheckCircle, Lock, PlayCircle, BookOpenCheck, FileBadge } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseProgress } from "@/Components/CourseCard"; // Simplificado del anterior

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked, isActive, isExam = false }) => {
  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : (isExam ? BookOpenCheck : PlayCircle));
  const linkHref = isExam ? `/courses/${courseId}/exams/${id}` : `/courses/${courseId}/chapters/${id}`;

  return (
    <Link
      href={linkHref}
      preserveState
      className={cn(
        "flex items-center gap-x-2 text-brand-ink dark:text-gray-300 text-base font-[500] pl-6 transition-all hover:text-brand-text hover:bg-brand/10 dark:hover:bg-brand/20",
        isActive && "text-brand-text dark:text-white bg-brand/10 dark:bg-brand/20 hover:bg-brand/10 hover:text-brand-text",
        isCompleted && "bg-brand text-white hover:text-white hover:bg-brand-darker dark:bg-brand-dark dark:hover:bg-brand-darker",
        isCompleted && isActive && "bg-brand-darker text-white hover:text-white",
      )}
    >
      <div className="flex items-center py-4">
        <Icon
          size={18}
          className={cn(
            "text-brand-ink dark:text-gray-400 mr-2",
            isActive && "text-brand-text dark:text-white",
            isCompleted && "text-white"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-[1.5px] border-brand-text h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-white"
        )}
      />
    </Link>
  )
}

export const CourseSidebar = ({ course, progressCount, currentChapterId, currentExamId, purchase }) => {
  return (
    <div className="h-full border-r dark:border-brand-soft/20 flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-[#252525]">
      <div className="p-8 flex flex-col border-b dark:border-brand-soft/20">
        <h1 className="font-semibold dark:text-white">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {(() => {
          const items = [];
          if (course.chapters) {
            course.chapters.forEach(c => items.push({ ...c, type: 'chapter' }));
          }
          if (course.exams) {
            course.exams.forEach(e => items.push({ ...e, type: 'exam' }));
          }
          
          items.sort((a, b) => a.position - b.position);

          return items.map((item) => {
            if (item.type === 'chapter') {
              const progressList = item.user_progress || item.userProgress;
              return (
                <CourseSidebarItem
                  key={`chapter-${item.id}`}
                  id={item.id}
                  label={item.title}
                  isCompleted={Array.isArray(progressList)
                    ? !!progressList.find((progress) => progress?.is_completed)
                    : !!progressList?.is_completed}
                  courseId={course.id}
                  isLocked={!item.is_free && !purchase}
                  isActive={item.id === currentChapterId}
                />
              )
            } else {
              const hasPassed = Array.isArray(item.attempts) && item.attempts.some(attempt => attempt.score >= item.min_score);
              return (
                <CourseSidebarItem
                  key={`exam-${item.id}`}
                  id={item.id}
                  label={item.title}
                  isCompleted={hasPassed} 
                  courseId={course.id}
                  isLocked={!course.is_free && !purchase}
                  isActive={item.id === currentExamId}
                  isExam={true}
                />
              )
            }
          });
        })()}

        {progressCount === 100 && (
          <>
            <div className="px-6 py-2 text-xs font-semibold text-brand-ink dark:text-gray-400 mt-2 uppercase tracking-wide">Certificado</div>
            <a
              href={`/courses/${course.id}/certificate`}
              className="flex items-center gap-x-2 text-brand-ink dark:text-gray-300 text-base font-[500] pl-6 py-4 transition-all hover:text-brand-text hover:bg-brand/10 dark:hover:bg-brand/20"
              target="_blank"
              rel="noreferrer"
            >
              <FileBadge size={18} className="text-brand mr-2" />
              Descargar Certificado
            </a>
          </>
        )}
      </div>
    </div>
  )
}
