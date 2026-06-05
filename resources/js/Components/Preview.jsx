import React from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export const Preview = ({ value, className }) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit, 
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
        attributes: {
        class: className || "prose prose-sm max-w-none text-brand-text bg-transparent"
        }
    }
  });

  return <EditorContent editor={editor} />;
};
