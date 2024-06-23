import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
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
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
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
      const [width, setWidth] = useState(node.attrs.width || "100%");
      const [alignment, setAlignment] = useState(
        node.attrs.alignment || "center"
      );

      const handleResize = (event) => {
        const newWidth = event.target.value + "%";
        setWidth(newWidth);
        updateAttributes({ width: newWidth });
      };

      useEffect(() => {
        if (!node.attrs.width) {
          updateAttributes({ width: "100%" });
        }
        if (!node.attrs.alignment) {
          updateAttributes({ alignment: "center" });
        }
        console.log("Node attributes updated", node.attrs);
      }, [node.attrs, updateAttributes]);

      return (
        <NodeViewWrapper
          className={`${styles.resizableImage} ${styles[alignment]}`}
          style={{ width }}
        >
          <img
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
            style={{ width: "100%" }}
          />
          <input
            type="range"
            min="10"
            max="100"
            value={parseInt(width, 10)}
            onChange={handleResize}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          />
          <div className={styles.alignmentButtons}>
            <button
              onClick={() => {
                setAlignment("left");
                updateAttributes({ alignment: "left" });
              }}
            >
              Left
            </button>
            <button
              onClick={() => {
                setAlignment("center");
                updateAttributes({ alignment: "center" });
              }}
            >
              Center
            </button>
            <button
              onClick={() => {
                setAlignment("right");
                updateAttributes({ alignment: "right" });
              }}
            >
              Right
            </button>
          </div>
        </NodeViewWrapper>
      );
    });
  },
});

export default ResizableImage;
