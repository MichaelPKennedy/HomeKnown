import React from "react";

class ErrorThrower extends React.Component {
  componentDidMount() {
    throw new Error("This is a test error");
  }

  render() {
    return <div>This text will not be shown.</div>;
  }
}

export default ErrorThrower;
