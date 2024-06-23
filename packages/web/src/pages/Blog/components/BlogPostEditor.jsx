import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import ResizableImage from "./ResizableImage";
import Toolbar from "./Toolbar";
import { ImageDrop } from "../utils/ImageDrop";
import styles from "./BlogPostEditor.module.css";

const BlogPostEditor = ({ initialContent, onContentChange }) => {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageDrop,
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      ResizableImage,
    ],
    content: initialContent,
  });

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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default BlogPostEditor;
