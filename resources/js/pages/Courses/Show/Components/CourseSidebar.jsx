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
        "flex items-center gap-x-2 text-brand-ink text-sm font-[500] pl-6 transition-all hover:text-brand-text hover:bg-brand-soft/20",
        isActive && "text-brand-text bg-brand-soft/20 hover:bg-brand-soft/20 hover:text-brand-text",
        isCompleted && "bg-green-600 text-white hover:text-white hover:bg-green-700",
        isCompleted && isActive && "bg-green-700 text-white hover:text-white",
      )}
    >
      <div className="flex items-center py-4">
        <Icon
          size={18}
          className={cn(
            "text-brand-ink mr-2",
            isActive && "text-brand-text",
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
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
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
            <div className="px-6 py-2 text-xs font-semibold text-brand-ink mt-2 uppercase tracking-wide">Certificado</div>
            <a
              href={`/courses/${course.id}/certificate`}
              className="flex items-center gap-x-2 text-brand-ink text-sm font-[500] pl-6 py-4 transition-all hover:text-brand-text hover:bg-brand-soft/20"
              target="_blank"
              rel="noreferrer"
            >
              <FileBadge size={18} className="text-emerald-700 mr-2" />
              Descargar Certificado
            </a>
          </>
        )}
      </div>
    </div>
  )
}
