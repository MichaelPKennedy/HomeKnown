import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./BlogPost.module.css";

const BlogPost = () => {
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.blogPostContainer}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>
        <em>
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </em>
      </p>
    </div>
  );
};

export default BlogPost;
