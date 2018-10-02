import { swiss } from "mdx-deck/themes";
import style from "react-syntax-highlighter/styles/prism/ghcolors";
import javascript from "react-syntax-highlighter/languages/prism/javascript";

export default {
  ...swiss,
  font: "Raleway, sans-serif",
  colors: {
    text: "black",
    background: "white",
    code: "#c2185b",
    link: "blue"
  },
  prism: {
    style,
    languages: {
      javascript
    }
  }
};
