import { CourseSidebar } from "./CourseSidebar";
import { CourseNavbar } from "./CourseNavbar";

export function CourseLayout({ children, course, progressCount, currentChapterId, currentExamId, purchase, hideSidebar = false }) {
  return (
    <div className="h-screen bg-brand-pale relative">
      <div className={`h-[80px] ${hideSidebar ? '' : 'md:pl-80'} fixed inset-y-0 w-full z-50`}>
        <CourseNavbar course={course} progressCount={progressCount} currentChapterId={currentChapterId} purchase={purchase} />
      </div>
      {!hideSidebar && (
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar 
              course={course} 
              progressCount={progressCount} 
              currentChapterId={currentChapterId}
              currentExamId={currentExamId}
              purchase={purchase}
          />
        </div>
      )}
      <main className={`${hideSidebar ? '' : 'md:pl-80'} pt-[80px] h-full overflow-y-auto`}>
        {children}
      </main>
    </div>
  )
}
