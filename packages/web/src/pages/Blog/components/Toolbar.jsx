import React from "react";

const Toolbar = ({ editor, selectedImage }) => {
  if (!editor) {
    return null;
  }

  const setImageClass = (className) => {
    if (selectedImage) {
      selectedImage.className = className;
      editor.commands.focus();
    }
  };

  return (
    <div className="toolbar">
      <button onClick={() => setImageClass("left")} disabled={!selectedImage}>
        Align Left
      </button>
      <button onClick={() => setImageClass("center")} disabled={!selectedImage}>
        Align Center
      </button>
      <button onClick={() => setImageClass("right")} disabled={!selectedImage}>
        Align Right
      </button>
      <button onClick={() => setImageClass("small")} disabled={!selectedImage}>
        Small
      </button>
      <button onClick={() => setImageClass("medium")} disabled={!selectedImage}>
        Medium
      </button>
      <button onClick={() => setImageClass("large")} disabled={!selectedImage}>
        Large
      </button>
    </div>
  );
};

export default Toolbar;
