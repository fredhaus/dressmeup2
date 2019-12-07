import React from 'react';
import { withRouter } from "react-router-dom"
import { Link, Redirect, Switch, Route } from "react-router-dom";

class CameraMobile extends React.Component {

  state = {
    user: this.props.user
  }

  render() {
    return (
      <div>
        <h1>CameraMobile</h1>
         <form onSubmit={this.submitHandler}>
         <input type="file" accept="image/*"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

export default withRouter(CameraMobile);

