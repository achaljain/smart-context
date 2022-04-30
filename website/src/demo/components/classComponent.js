import React from "react";
import { WithContextConsumer } from "smart-context";

class ClassComp extends React.Component {
  constructor(props) {
    super(props);

    this.updateData = this.updateData.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  updateData() {
    const {
      actions: { updateUser },
    } = this.props.user;

    updateUser({
      name: "John",
      email: "john@abc.com",
    });
  }

  resetData() {
    const {
      actions: { reset },
    } = this.props.user;
    reset();
  }

  render() {
    const {
      state: { name, email },
    } = this.props.user;
    return (
      <div className="demo-section">
        <h2>User Context</h2>
        <p>A class component with flat State object.</p>
        {name && <p>Name: {name}</p>}
        {email && <p>Email: {email}</p>}
        <button onClick={this.updateData}>Update</button>
        <button onClick={this.resetData}>Reset</button>
      </div>
    );
  }
}

/**
 * Wrap component in hoc to access all the contexts
 * Pass array of display names
 */
export default WithContextConsumer(ClassComp, ["user"]);
