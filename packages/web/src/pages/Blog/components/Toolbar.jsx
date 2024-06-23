import React from "react";

const Toolbar = ({ editor, selectedImage }) => {
  if (!editor) {
    return null;
  }

  const setImageClass = (alignment, size) => {
    if (selectedImage) {
      if (alignment) {
        selectedImage.setAttribute("data-alignment", alignment);
        selectedImage.className = `${alignment} ${
          selectedImage.getAttribute("data-size") || "medium"
        }`;
      }
      if (size) {
        selectedImage.setAttribute("data-size", size);
        selectedImage.className = `${
          selectedImage.getAttribute("data-alignment") || "center"
        } ${size}`;
      }
      editor.commands.focus();
    }
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => setImageClass("left", null)}
        disabled={!selectedImage}
      >
        Align Left
      </button>
      <button
        onClick={() => setImageClass("center", null)}
        disabled={!selectedImage}
      >
        Align Center
      </button>
      <button
        onClick={() => setImageClass("right", null)}
        disabled={!selectedImage}
      >
        Align Right
      </button>
      <button
        onClick={() => setImageClass(null, "small")}
        disabled={!selectedImage}
      >
        Small
      </button>
      <button
        onClick={() => setImageClass(null, "medium")}
        disabled={!selectedImage}
      >
        Medium
      </button>
      <button
        onClick={() => setImageClass(null, "large")}
        disabled={!selectedImage}
      >
        Large
      </button>
    </div>
  );
};

export default Toolbar;
