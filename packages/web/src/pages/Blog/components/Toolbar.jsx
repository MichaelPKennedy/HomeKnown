import React from "react";

const Toolbar = ({ editor, selectedImage }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

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
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal Rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        Hard Break
      </button>
      <button onClick={addImage}>Insert Image</button>
      <button onClick={addTable}>Insert Table</button>
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
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        Text Align Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        Text Align Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        Text Align Right
      </button>
    </div>
  );
};

export default Toolbar;
