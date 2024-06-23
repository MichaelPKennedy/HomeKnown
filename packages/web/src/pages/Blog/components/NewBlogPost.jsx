import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostEditor from "./BlogPostEditor";
import { useBlog } from "../../../utils/BlogContext";
import styles from "./NewBlogPost.module.css";

const NewBlogPost = () => {
  const { addPost, updatePost, posts } = useBlog();
  const { id } = useParams();
  const navigate = useNavigate();
  const existingPost = posts.find((post) => post.post_id === Number(id));

  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [author, setAuthor] = useState(existingPost ? existingPost.author : "");
  const [content, setContent] = useState(
    existingPost ? existingPost.content : ""
  );
  const [category, setCategory] = useState(
    existingPost ? existingPost.category : "general"
  );

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
      navigate("/blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      </form>
      <BlogPostEditor
        initialContent={content}
        onContentChange={(html) => setContent(html)}
      />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
};

export default NewBlogPost;
