import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { File } from 'lucide-react';
import CourseLayout from '@/Layouts/CourseLayout';
import { VideoPlayer } from './Components/VideoPlayer';
import { CourseEnrollButton } from './Components/CourseEnrollButton';
import { CourseProgressButton } from './Components/CourseProgressButton';
import { Banner } from '@/Components/banner';

export default function ChapterIndex({ 
  course, 
  chapter, 
  attachments, 
  nextChapter, 
  userProgress, 
  purchase, 
  progressCount 
}) {
  const isCompleted = !!userProgress?.is_completed;
  const isChapterLocked = !chapter.is_free && !purchase;
  // Solo se marca como autocompletado si NO estaba completado antes.
  const completeOnEnd = !isCompleted;

  return (
    <CourseLayout course={course} progressCount={progressCount} purchase={purchase}>
      <Head title={`${chapter.title} - ${course.title}`} />
      
      {userProgress?.is_completed && (
        <Banner variant="success" label="Ya completaste este capítulo." />
      )}
      {isChapterLocked && (
        <Banner variant="warning" label="Necesitas comprar este curso para ver este capítulo." />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20 mt-6">
        <div className="bg-white dark:bg-[#252525] flex flex-col w-full rounded-none">
          <div className="p-0">
            <VideoPlayer
              chapterId={chapter.id}
              title={chapter.title}
              courseId={course.id}
              nextChapterId={nextChapter?.id}
              isLocked={isChapterLocked}
              completeOnEnd={completeOnEnd}
              videoUrl={chapter.video_url}
            />
          </div>
        
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between border-b-0 dark:border-brand-soft/20">
            <h2 className="text-2xl font-semibold mb-2 md:mb-0 dark:text-white">
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
              <CourseEnrollButton
                courseId={course.id}
                price={course.price}
              />
            )}
          </div>
          
          <div className="px-6 pb-6 md:px-10 md:pb-10">
            <div className="prose max-w-none prose-brand dark:prose-invert [&_*]:!text-brand-ink dark:[&_*]:!text-white" dangerouslySetInnerHTML={{ __html: chapter.description }} />
          </div>
        
          {!!attachments?.length && (
            <div className="px-6 pb-6 md:px-10 md:pb-10">
              <h3 className="font-semibold text-lg mb-4 text-brand-text dark:text-gray-300">Archivos Adjuntos</h3>
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url?.startsWith('http') ? attachment.url : `/storage/${attachment.url}`}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-4 w-full bg-brand-pale dark:bg-brand-dark border-0 text-brand-ink dark:text-white font-semibold rounded-none hover:bg-brand hover:text-white dark:hover:bg-brand-darker transition-colors"
                  >
                    <File className="h-4 w-4 mr-3" />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CourseLayout>
  );
}
