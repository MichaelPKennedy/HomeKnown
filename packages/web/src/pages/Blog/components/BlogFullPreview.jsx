import React, { useEffect, useState } from "react";
import styles from "./BlogFullPreview.module.css";

const BlogFullPreview = () => {
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("draftPost"));
    setDraft(savedDraft);
  }, []);

  if (!draft) {
    return <div>No draft post available for preview.</div>;
  }

  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>{draft.title}</h1>
      <p className={styles.blogAuthor}>
        <strong>Author:</strong> {draft.author}
      </p>
      <div
        className={styles.blogContent}
        dangerouslySetInnerHTML={{ __html: draft.content }}
      />
    </div>
  );
};

export default BlogFullPreview;
