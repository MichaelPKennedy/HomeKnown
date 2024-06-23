import { Extension } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { Plugin } from "prosemirror-state";

export const ImageDrop = Image.extend({
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