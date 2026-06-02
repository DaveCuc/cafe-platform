import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }) => {
  const { url } = usePage();
  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = url.includes(id);

  return (
    <Link
      href={`/courses/${courseId}/chapters/${id}`}
      className={cn(
        "flex items-center gap-x-2 text-brand-ink dark:text-gray-300 text-sm font-[500] pl-6 transition-all hover:text-brand-text hover:bg-brand/10 dark:hover:bg-brand/20",
        isActive && "text-brand-text dark:text-white bg-brand/10 dark:bg-brand/20 hover:bg-brand/10 hover:text-brand-text",
        isCompleted && "text-brand-text dark:text-white hover:text-brand-text",
        isCompleted && isActive && "bg-brand-pale dark:bg-brand-darker"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22} 
          className={cn(
            "text-brand-ink dark:text-gray-400", 
            isActive && "text-brand-text dark:text-white", 
            isCompleted && "text-brand-text dark:text-white"
          )} 
        />
        {label}
      </div>
      <div 
        className={cn(
          "ml-auto opacity-0 border-2 border-brand-text h-full transition-all", 
          isActive && "opacity-100", 
          isCompleted && "border-brand-text"
        )} 
      />
    </Link>
  );
};

export const CourseSidebar = ({ course, progressCount, purchase }) => {
  return (
    <div className="h-full border-r dark:border-brand-soft/20 flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-[#252525]">
      <div className="p-8 flex flex-col border-b dark:border-brand-soft/20">
        <h1 className="font-semibold dark:text-white">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <div className="w-full">
               <p className="text-sm font-medium mb-2 text-brand-text dark:text-gray-300">
                 {progressCount}% Completado
               </p>
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-none h-2">
                 <div 
                   className="bg-brand dark:bg-white h-2 rounded-none transition-all" 
                   style={{ width: `${progressCount}%` }}
                 ></div>
               </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.is_completed}
            courseId={course.id}
            isLocked={!chapter.is_free && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
