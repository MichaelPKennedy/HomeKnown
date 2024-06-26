import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useParams } from "react-router-dom";
import { useBlog } from "../../../utils/BlogContext";
import { blogTemplate } from "../../../utils/blogTemplate";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Toolbar from "./Toolbar";
import { ImageDrop } from "../utils/ImageDrop";
import styles from "./BlogPostEditor.module.css";

const BlogPostEditor = () => {
  const { addPost, updatePost, posts } = useBlog();
  const [content, setContent] = useState(() => {
    localStorage.removeItem("draftPost");
    const draft = localStorage.getItem("draftPost");
    return draft ? JSON.parse(draft).content : blogTemplate.content;
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();
  const existingPost = posts.find((post) => post.post_id === Number(id));

  const [title, setTitle] = useState(blogTemplate.title);
  const [author, setAuthor] = useState(blogTemplate.author);
  const [category, setCategory] = useState(blogTemplate.category);

  useEffect(() => {
    const draft = localStorage.getItem("draftPost");
    if (!existingPost && draft) {
      const parsedDraft = JSON.parse(draft);
      setTitle(parsedDraft.title);
      setAuthor(parsedDraft.author);
      setContent(parsedDraft.content);
      setCategory(parsedDraft.category);
    } else if (existingPost) {
      setTitle(existingPost.title);
      setAuthor(existingPost.author);
      setContent(existingPost.content);
      setCategory(existingPost.category);
    } else {
      setTitle(blogTemplate.title);
      setAuthor(blogTemplate.author);
      setContent(blogTemplate.content);
      setCategory(blogTemplate.category);
    }
  }, [existingPost]);

  const handleClearDraft = () => {
    localStorage.removeItem("draftPost");
    setTitle(blogTemplate.title);
    setAuthor(blogTemplate.author);
    setContent(blogTemplate.content);
    setCategory(blogTemplate.category);
  };

  const handleSave = async () => {
    const post = {
      title,
      author,
      content,
      category,
    };

    try {
      if (existingPost) {
        await updatePost(existingPost.post_id, post);
      } else {
        await addPost(post);
      }
      localStorage.removeItem("draftPost");
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageDrop,
      ImageResize,
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
      localStorage.setItem("draftPost", html);
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
      <button onClick={handleSave}>Save Post</button>
      <button onClick={handleClearDraft}>Clear Draft</button>
    </div>
  );
};

export default BlogPostEditor;
