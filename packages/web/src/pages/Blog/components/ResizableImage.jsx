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
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          return { style: `width: ${attributes.width}` };
        },
      },
      alignment: {
        default: "center",
        parseHTML: (element) =>
          element.getAttribute("data-alignment") || "center",
        renderHTML: (attributes) => {
          return { "data-alignment": attributes.alignment };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
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
      const imgRef = useRef();

      useEffect(() => {
        const handleResize = (event) => {
          setWidth(event.target.value + "%");
          updateAttributes({ width: event.target.value + "%" });
        };

        const img = imgRef.current;
        img.addEventListener("resize", handleResize);

        return () => {
          img.removeEventListener("resize", handleResize);
        };
      }, [imgRef, updateAttributes]);

      return (
        <NodeViewWrapper
          className={`${styles.resizableImage} ${styles[alignment]}`}
          style={{ width }}
        >
          <img
            ref={imgRef}
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
            onChange={(e) => {
              setWidth(e.target.value + "%");
              updateAttributes({ width: e.target.value + "%" });
            }}
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
