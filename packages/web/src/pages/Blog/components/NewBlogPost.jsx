import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostEditor from "./BlogPostEditor";
import { useBlog } from "../../../utils/BlogContext";
import styles from "./NewBlogPost.module.css";
import { blogTemplate } from "../../../utils/blogTemplate";

const NewBlogPost = () => {
  const { addPost, updatePost, posts } = useBlog();
  const { id } = useParams();
  const navigate = useNavigate();
  const existingPost = posts.find((post) => post.post_id === Number(id));

  const [title, setTitle] = useState(blogTemplate.title);
  const [author, setAuthor] = useState(blogTemplate.author);
  const [content, setContent] = useState(blogTemplate.content);
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
      navigate("/blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const handleDraftSave = () => {
    const draft = {
      title,
      author,
      content,
      category,
    };
    localStorage.setItem("draftPost", JSON.stringify(draft));
  };

  const handlePreview = () => {
    handleDraftSave();
    navigate("/blog/test");
  };

  const handleClearDraft = () => {
    localStorage.removeItem("draftPost");
    setTitle(blogTemplate.title);
    setAuthor(blogTemplate.author);
    setContent(blogTemplate.content);
    setCategory(blogTemplate.category);
  };

  return (
    <div className={styles.newBlogPostContainer}>
      <form className={styles.detailsForm}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleDraftSave();
            }}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              handleDraftSave();
            }}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleDraftSave();
            }}
            required
          />
        </div>
      </form>
      <BlogPostEditor
        initialContent={content}
        onContentChange={(html) => {
          setContent(html);
          handleDraftSave();
        }}
      />
      <button onClick={handleSave}>Save Post</button>
      <button onClick={handlePreview}>Preview Post</button>
      <button onClick={handleClearDraft}>Clear Draft</button>
    </div>
  );
};

export default NewBlogPost;
