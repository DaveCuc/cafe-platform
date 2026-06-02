import { Link } from "@inertiajs/react";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { CourseSidebar } from "./CourseSidebar";
import { Button } from "@/Components/ui/button";

const CourseMobileSidebar = ({ course, progressCount, currentChapterId, purchase }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition dark:text-white">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white dark:bg-[#252525] w-72 border-r-0">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          currentChapterId={currentChapterId}
          purchase={purchase}
        />
      </SheetContent>
    </Sheet>
  )
}

export const CourseNavbar = ({ course, progressCount, currentChapterId, purchase }) => {
  return (
    <div className="p-4 border-b dark:border-brand-soft/20 h-full flex items-center bg-white dark:bg-[#252525] shadow-sm justify-between transition-colors">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        currentChapterId={currentChapterId}
        purchase={purchase}
      />
      <div className="flex ml-auto md:ml-0 gap-x-2">
         <Link href="/search">
            <Button size="sm" variant="ghost" className="rounded-none dark:text-white dark:hover:bg-brand-dark transition-colors">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
            </Button>
         </Link>
      </div>
    </div>
  )
}
