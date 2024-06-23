import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Toolbar from "./Toolbar";
import { ImageDrop } from "../utils/ImageDrop";
import BlogPostPreview from "./BlogPostPreview";
import styles from "./BlogPostEditor.module.css";

const BlogPostEditor = ({ initialContent, onContentChange }) => {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageDrop,
      Image,
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
        setContent(html);
        onContentChange(html);
      };
      editor.on("update", handleUpdate);
      return () => editor.off("update", handleUpdate);
    }
  }, [editor, onContentChange]);

  return (
    <div className={styles.editorPreviewContainer}>
      <div className={styles.editorContainer}>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <div className={styles.previewContainer}>
        <BlogPostPreview content={content} />
      </div>
    </div>
  );
};

export default BlogPostEditor;
