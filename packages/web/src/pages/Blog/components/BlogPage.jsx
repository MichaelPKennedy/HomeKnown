import React from "react";
import { useBlog } from "../../../utils/BlogContext";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
  const { posts, loading, error } = useBlog();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  if (!loading && !posts) return <div>No posts found.</div>;

  return (
    <div className={styles.blogPageContainer}>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.post_id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>
            <em>
              By {post.author} on{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
