import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const renderDocument = (document) => {
  const Text = ({ children }) => <p>{children}</p>;
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
    },
    renderText: (text) =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text])
  };

  return documentToReactComponents(document, options);
};

const RichText = ({ document }) => (
  <div>
      {renderDocument(document)}
  </div>
);

export default RichText;