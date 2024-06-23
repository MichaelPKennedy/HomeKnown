import Image from "@tiptap/extension-image";
import { Plugin } from "prosemirror-state";

export const ImageDrop = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alignment: {
        parseHTML: (element) => {
          console.log("Parsing alignment from HTML:", element);
          console.log(
            "Parsing alignment from HTML:",
            element.getAttribute("data-alignment")
          );
          const alignment = element.getAttribute("data-alignment") || "center";
          console.log("Parsing alignment from HTML:", alignment);
          return alignment;
        },
        renderHTML: (attributes) => {
          console.log("Rendering alignment to HTML:", attributes.alignment);
          return {
            "data-alignment": attributes.alignment,
            class: attributes.alignment, // Add class for alignment
          };
        },
      },
      size: {
        parseHTML: (element) => {
          const size = element.getAttribute("data-size") || "medium";
          console.log(
            "Parsing alignment from HTML:",
            element.getAttribute("data-size")
          );
          console.log("Parsing size from HTML:", size);
          return size;
        },
        renderHTML: (attributes) => {
          console.log("Rendering size to HTML:", attributes.size);
          return {
            "data-size": attributes.size,
            class: attributes.size, // Add class for size
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              const hasFiles = event.dataTransfer?.files?.length;

              if (!hasFiles) {
                return false;
              }

              const images = Array.from(event.dataTransfer.files).filter(
                (file) => /image/i.test(file.type)
              );

              if (images.length === 0) {
                return false;
              }

              event.preventDefault();

              const { schema } = view.state;

              images.forEach((image) => {
                const reader = new FileReader();

                reader.onload = (readerEvent) => {
                  const node = schema.nodes.image.create({
                    src: readerEvent.target.result,
                  });
                  const transaction = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                };

                reader.readAsDataURL(image);
              });

              return true;
            },
          },
        },
      }),
    ];
  },
});
