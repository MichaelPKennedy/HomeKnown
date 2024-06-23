import React from "react";

const BlogPostPreview = ({ content }) => {
  return (
    <div
      className="blog-post-preview"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogPostPreview;
