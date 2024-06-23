import React from "react";
import styles from "./BlogPostEditor.module.css";

const BlogPostPreview = ({ content }) => {
  console.log(content);
  return (
    <div
      className="blog-post-preview"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogPostPreview;
