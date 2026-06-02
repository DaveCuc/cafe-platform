import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

export const ExamsList = ({ items, onReorder, onEdit }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [exams, setExams] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setExams(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const itemsCopy = Array.from(exams);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedExams = itemsCopy.slice(startIndex, endIndex + 1);

    setExams(itemsCopy);

    const bulkUpdateData = updatedExams.map((exam) => ({
      id: exam.id,
      position: itemsCopy.findIndex((item) => item.id === exam.id)
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="exams">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {exams.map((exam, index) => (
              <Draggable key={exam.id} draggableId={exam.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-white border-brand-soft border text-brand-ink rounded-none mb-4 text-sm",
                      exam.is_published && "bg-brand-mint border-emerald-200 text-emerald-600"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-brand-soft hover:bg-brand-pale rounded-l-md transition",
                        exam.is_published && "border-r-emerald-200 hover:bg-brand-mint"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {exam.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge className={cn("bg-brand-soft", exam.is_published && "bg-white")}>
                        {exam.is_published ? "Publicado" : "Borrador"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(exam.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition text-brand-ink"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
