import React from "react";

const Toolbar = ({ editor, selectedImage }) => {
  if (!editor) {
    return null;
  }

  const setImageClass = (alignment, size) => {
    if (selectedImage) {
      const { state, view } = editor;
      const { tr } = state;
      const pos = view.posAtDOM(selectedImage);

      if (pos === -1) {
        console.error("Invalid position:", pos);
        return;
      }

      const node = tr.doc.nodeAt(pos);

      if (!node) {
        console.error("No node found at position:", pos);
        return;
      }

      const newAttrs = {
        ...node.attrs,
        alignment: alignment || node.attrs.alignment,
        size: size || node.attrs.size,
      };

      try {
        tr.setNodeMarkup(pos, null, newAttrs);

        // Manually set the selection to the updated image node
        const resolvedPos = tr.doc.resolve(pos);
        tr.setSelection(state.selection.constructor.near(resolvedPos));
        view.dispatch(tr);

        // Refocus the editor
        editor.commands.focus();

        if (alignment) {
          selectedImage.setAttribute("data-alignment", alignment);
          selectedImage.className = `${alignment} ${
            selectedImage.getAttribute("data-size") || "medium"
          } focused-image`;
        }
        if (size) {
          selectedImage.setAttribute("data-size", size);
          selectedImage.className = `${
            selectedImage.getAttribute("data-alignment") || "center"
          } ${size} focused-image`;
        }
      } catch (error) {
        console.error("Error updating node:", error);
      }
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
