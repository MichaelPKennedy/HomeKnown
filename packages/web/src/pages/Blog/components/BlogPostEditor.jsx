import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";
import { ImageDrop } from "../utils/ImageDrop";
import styles from "./BlogPostEditor.module.css";

const BlogPostEditor = ({ initialContent, onContentChange }) => {
  const [content, setContent] = useState(initialContent);
  const [selectedImage, setSelectedImage] = useState(null);

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
      Image,
    ],
    content: initialContent,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
      onContentChange(html);
    },
    onSelectionUpdate({ editor }) {
      const { selection } = editor.state;
      const node = editor.view.nodeDOM(selection.$anchor.pos);
      if (node && node.nodeName === "IMG") {
        setSelectedImage(node);
      } else {
        setSelectedImage(null);
      }
    },
  });

  useEffect(() => {
    const draftContent = localStorage.getItem("blogPostDraft");
    if (draftContent && editor) {
      editor.commands.setContent(draftContent);
    }
  }, [editor]);

  const handleTemporarySave = () => {
    localStorage.setItem("blogPostDraft", content);
    alert("Draft saved temporarily!");
  };

  return (
    <div className={styles.editorPreviewContainer}>
      <div className={styles.editorContainer}>
        <Toolbar editor={editor} selectedImage={selectedImage} />
        <EditorContent editor={editor} />
        <button onClick={handleTemporarySave}>Save Progress</button>
      </div>
      <div className={styles.previewContainer}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default BlogPostEditor;
