import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil, BookOpen, ClipboardList } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

export const CourseContentList = ({ items, onReorder, onEditChapter, onEditExam }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContent(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const itemsCopy = Array.from(content);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedContent = itemsCopy.slice(startIndex, endIndex + 1);

    setContent(itemsCopy);

    const bulkUpdateData = updatedContent.map((item) => ({
      id: item.id,
      type: item.type,
      position: itemsCopy.findIndex((contentItem) => contentItem.id === item.id) + 1
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="content">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {content.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-2 bg-white text-brand-ink rounded-none mb-4 text-sm shadow-sm",
                      item.is_published && "bg-brand-pale text-brand"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 hover:bg-gray-100 transition",
                        item.is_published && "hover:bg-brand/20"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-x-2 px-2">
                      {item.type === 'chapter' ? <BookOpen className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider hidden sm:block">{item.type === 'chapter' ? 'Capítulo' : 'Examen'}</span>
                      {item.type === 'chapter' && item.is_free && <Badge>Gratis</Badge>}
                      <Badge className={cn("bg-gray-200 text-gray-700 rounded-none uppercase font-bold tracking-wider", item.is_published && "bg-brand text-white hover:bg-brand-darker")}>
                        {item.is_published ? "Publicado" : "Borrador"}
                      </Badge>
                      <Pencil
                        onClick={() => item.type === 'chapter' ? onEditChapter(item.id) : onEditExam(item.id)}
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