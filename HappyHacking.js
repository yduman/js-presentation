import React from "react";
import posed from "react-pose";

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

export default class HappyHacking extends React.Component {
  state = { isVisible: true };

  componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 2000);
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Box pose={isVisible ? "visible" : "hidden"}>{this.props.children}</Box>
    );
  }
}
