import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import styles from "./BlogPostEditor.module.css";

const ResizableImage = Node.create({
  name: "resizableImage",

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: {
        default: "100%",
        parseHTML: (element) => element.style.width || "100%",
        renderHTML: (attributes) => ({ style: `width: ${attributes.width}` }),
      },
      alignment: {
        default: "center",
        parseHTML: (element) =>
          element.getAttribute("data-alignment") || "center",
        renderHTML: (attributes) => ({
          "data-alignment": attributes.alignment,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node, updateAttributes }) => {
      const [width, setWidth] = useState(node.attrs.width);
      const [alignment, setAlignment] = useState(node.attrs.alignment);

      useEffect(() => {
        if (!node.attrs.width || !node.attrs.alignment) {
          const updatedAttrs = {};
          if (!node.attrs.width) updatedAttrs.width = "100%";
          if (!node.attrs.alignment) updatedAttrs.alignment = "center";
          updateAttributes(updatedAttrs);
        }
      }, [node.attrs, updateAttributes]);

      const handleWidthChange = (event) => {
        const newWidth = event.target.value + "%";
        setWidth(newWidth);
        updateAttributes({ width: newWidth });
      };

      const handleAlignmentChange = (newAlignment) => {
        setAlignment(newAlignment);
        updateAttributes({ alignment: newAlignment });
      };

      return (
        <>
          <img
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
            style={{ width: "100%" }}
            draggable="false" // Prevent dragging the image itself
          />
          <input
            type="range"
            min="10"
            max="100"
            value={parseInt(width, 10)}
            onChange={handleWidthChange}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          />
          <div className={styles.alignmentButtons}>
            <button onClick={() => handleAlignmentChange("left")}>Left</button>
            <button onClick={() => handleAlignmentChange("center")}>
              Center
            </button>
            <button onClick={() => handleAlignmentChange("right")}>
              Right
            </button>
          </div>
        </>
      );
    });
  },
});

export default ResizableImage;
