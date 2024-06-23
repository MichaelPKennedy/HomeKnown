import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Toolbar from "./Toolbar";
import { ImageDrop } from "../utils/ImageDrop";

const BlogPostEditor = ({ initialContent, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      ImageDrop,
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: initialContent,
  });

  useEffect(() => {
    if (editor) {
      console.log("Editor initialized", editor);
    }
  }, [editor]);

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        const html = editor.getHTML();
        onContentChange(html);
      };
      editor.on("update", handleUpdate);
      return () => editor.off("update", handleUpdate);
    }
  }, [editor, onContentChange]);

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogPostEditor;
