import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useBlog } from "../../../utils/BlogContext";
import styles from "./BlogPost.module.css";

const BlogPost = () => {
  const location = useLocation();
  const { posts, loading, error } = useBlog();
  const { title } = useParams();
  const { post } = location.state || {};

  const blogPost = post
    ? post
    : posts.find(
        (post) => post.title.replace(/\s+/g, "-").toLowerCase() === title
      );

  if (!post && loading) return <div>Loading...</div>;
  if (!post && error) return <div>Error loading post</div>;

  if (!blogPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.blogPostContainer}>
      <h1>{blogPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      <p>
        <em>
          By {blogPost.author} on{" "}
          {new Date(blogPost.createdAt).toLocaleDateString()}
        </em>
      </p>
    </div>
  );
};

export default BlogPost;
