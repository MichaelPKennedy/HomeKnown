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
  const [content, setContent] = useState(() => {
    const draft = localStorage.getItem("draftPost");
    return draft ? JSON.parse(draft).content : initialContent;
  });
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
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
      onContentChange(html);
    },
    onSelectionUpdate({ editor }) {
      const { selection } = editor.state;
      const node = editor.view.nodeDOM(selection.$anchor.pos);
      if (node && node.nodeName === "IMG") {
        node.classList.add("focused-image");
        setSelectedImage(node);
      } else {
        if (selectedImage) {
          selectedImage.classList.remove("focused-image");
        }
        setSelectedImage(null);
      }
    },
  });

  useEffect(() => {
    const draft = localStorage.getItem("draftPost");
    if (draft && editor) {
      const draftContent = JSON.parse(draft).content;
      editor.commands.setContent(draftContent);
    }
  }, [editor]);

  const handleTemporarySave = () => {
    localStorage.setItem("draftPost", JSON.stringify({ content }));
    alert("Draft saved temporarily!");
  };

  return (
    <div className={styles.editorPreviewContainer}>
      <div className={styles.editorContainer}>
        <Toolbar editor={editor} selectedImage={selectedImage} key="toolbar" />
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
