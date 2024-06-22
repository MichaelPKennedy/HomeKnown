import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const BlogPostEditor = ({ initialContent, onSave }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialContent,
  });

  const handleSave = () => {
    const html = editor.getHTML();
    onSave(html);
  };

  return (
    <div>
      <EditorContent editor={editor} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BlogPostEditor;
