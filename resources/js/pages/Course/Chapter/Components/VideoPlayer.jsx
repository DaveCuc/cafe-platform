import React, { useState } from "react";
import { Lock } from "lucide-react";
import { router } from "@inertiajs/react";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const VideoPlayer = ({ chapterId, title, courseId, nextChapterId, isLocked, completeOnEnd, videoUrl }) => {
  const confetti = useConfettiStore();
  const [isReady, setIsReady] = useState(false);

  const onEnd = () => {
    if (completeOnEnd) {
      router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: true,
      }, {
        onSuccess: () => {
          if (!nextChapterId) {
            confetti.onOpen();
          } else {
            router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
        }
      });
    }
  }

  return (
    <div className="relative aspect-video rounded-none overflow-hidden bg-black border-2 border-black dark:border-brand-soft/20">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/90 flex-col gap-y-4">
          <Lock className="h-10 w-10 text-white" />
          <p className="text-lg text-white font-bold uppercase tracking-wider">Este capítulo está bloqueado</p>
          <p className="text-sm text-gray-300">Inscríbete para acceder al contenido.</p>
        </div>
      )}
      {!isLocked && (
        <video 
           src={videoUrl}
           className="w-full h-full object-cover"
           controls
           controlsList="nodownload"
           onEnded={onEnd}
           onCanPlay={() => setIsReady(true)}
        />
      )}
    </div>
  )
};
