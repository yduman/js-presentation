import { future } from "mdx-deck/themes";
import style from "react-syntax-highlighter/styles/prism/atom-dark";
import javascript from "react-syntax-highlighter/languages/prism/javascript";

export default {
  ...future,
  font: "Fira Sans, sans-serif",
  prism: {
    style,
    languages: {
      javascript
    }
  }
};
