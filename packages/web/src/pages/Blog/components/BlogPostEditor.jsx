import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
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
import styles from "./BlogPostEditor.module.css";
import { AuthContext } from "../../../AuthContext";

const BlogPostEditor = () => {
  const { addPost, updatePost, posts } = useBlog();
  const location = useLocation();
  const postFromState = location.state ? location.state.post : null;
  const [content, setContent] = useState(() => {
    const draft = localStorage.getItem("draftPost");
    return draft ? JSON.parse(draft).content : blogTemplate.content;
  });

  const { id } = useParams();
  const existingPost =
    postFromState || posts.find((post) => post.post_id === Number(id));

  const [title, setTitle] = useState(
    existingPost ? existingPost.title : blogTemplate.title
  );
  const [author, setAuthor] = useState(
    existingPost ? existingPost.author : blogTemplate.author
  );
  const [category, setCategory] = useState(
    existingPost ? existingPost.category : blogTemplate.category
  );

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

    toast.info("Draft cleared.");
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
      toast.success("Blog post saved successfully!");
    } catch (error) {
      toast.error("Error has occured saving blog post.");
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
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
    },
  });

  useEffect(() => {
    localStorage.setItem(
      "draftPost",
      JSON.stringify({ title, author, category, content })
    );
  }, [content, title, author, category]);

  return (
    <div className={styles.editorPreviewContainer}>
      <div className={styles.editorContainer}>
        <div className={styles.inputFields}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Toolbar editor={editor} key="toolbar" />
        <EditorContent editor={editor} />
      </div>
      <div className={styles.btnContainer}>
        <button onClick={handleSave}>Save Post</button>
        <button onClick={handleClearDraft}>Clear Draft</button>
      </div>
    </div>
  );
};

export default BlogPostEditor;
