import { swiss } from "mdx-deck/themes";
import style from "react-syntax-highlighter/styles/prism/ghcolors";
import javascript from "react-syntax-highlighter/languages/prism/javascript";

export default {
  ...swiss,
  font: "Roboto, sans-serif",
  prism: {
    style,
    languages: {
      javascript
    }
  }
};
