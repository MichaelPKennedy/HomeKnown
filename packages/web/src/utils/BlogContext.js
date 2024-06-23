import React, { createContext, useState, useEffect, useContext } from "react";
import feathersClient from "../feathersClient";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await feathersClient.service("blog").find();
      console.log("blog response", response);
      setPosts(response);
    } catch (error) {
      setError(error);
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post) => {
    try {
      const response = await feathersClient.service("blog").create(post);
      setPosts((prevPosts) => [response, ...prevPosts]);
    } catch (error) {
      setError(error);
      console.error("Error adding blog post:", error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const response = await feathersClient
        .service("blogposts")
        .update(id, post);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.post_id === id ? response : p))
      );
    } catch (error) {
      setError(error);
      console.error("Error updating blog post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{ posts, loading, error, addPost, updatePost }}
    >
      {children}
    </BlogContext.Provider>
  );
};
