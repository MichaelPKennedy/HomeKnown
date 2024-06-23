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

      // Log the position for debugging
      console.log("Selected image position:", pos);

      // Validate position
      if (pos < 0 || pos > tr.doc.content.size) {
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

      console.log("Updating node attributes:", newAttrs);

      try {
        // Create a new node with updated attributes
        const newNode = node.type.create(newAttrs, node.content, node.marks);
        tr.setNodeMarkup(pos, null, newAttrs);

        // Force update the selection to ensure it's in sync with the updated node
        tr.setSelection(
          state.selection.constructor.create(tr.doc, pos, pos + 1)
        );
        view.dispatch(tr);

        // Update the selected image attributes in the DOM for immediate feedback
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
