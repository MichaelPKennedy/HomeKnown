import React, { useEffect, useState } from "react";

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
    <div>
      <h1>{draft.title}</h1>
      <p>
        <strong>Author:</strong> {draft.author}
      </p>
      <p>
        <strong>Category:</strong> {draft.category}
      </p>
      <div dangerouslySetInnerHTML={{ __html: draft.content }} />
    </div>
  );
};

export default BlogFullPreview;
