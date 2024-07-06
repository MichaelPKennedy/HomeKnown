import React, { useState } from "react";
import { useBlog } from "../../../utils/BlogContext";
import { Link } from "react-router-dom";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
  const { posts, loading, error } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  if (!loading && !posts) return <div>No posts found.</div>;

  const featuredPosts = posts.filter((post) => post.featured);
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className={styles.blogPageContainer}>
      <h1>Blog</h1>
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={styles.categoryButton}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <h2>Featured Posts</h2>
      <div className={styles.postsGrid}>
        {featuredPosts.map((post) => (
          <div key={post.post_id} className={styles.postItem}>
            <Link
              to={{
                pathname: `/blog/${post.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`,
              }}
              state={{ post }}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className={styles.thumbnail}
              />
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <h2>All Posts</h2>
      <div className={styles.postsGrid}>
        {filteredPosts.map((post) => (
          <div key={post.post_id} className={styles.postItem}>
            <Link
              to={{
                pathname: `/blog/${post.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`,
              }}
              state={{ post }}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className={styles.thumbnail}
              />
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
