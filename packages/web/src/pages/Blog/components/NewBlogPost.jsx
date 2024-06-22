// NewBlogPost.js
import React, { useState } from "react";
import BlogPostEditor from "./BlogPostEditor";

const NewBlogPost = ({ addPost, existingPost }) => {
  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [author, setAuthor] = useState(existingPost ? existingPost.author : "");
  const [content, setContent] = useState(
    existingPost ? existingPost.content : ""
  );

  const handleSave = () => {
    const post = {
      title,
      author,
      content,
      date: new Date().toISOString(),
    };
    addPost(post);
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
      </form>
      <BlogPostEditor
        initialContent={content}
        onSave={(html) => setContent(html)}
      />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
};

export default NewBlogPost;
