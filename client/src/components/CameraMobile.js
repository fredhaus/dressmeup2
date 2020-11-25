import React from "react";
import { withRouter } from "react-router-dom";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import axios from "axios";

class CameraMobile extends React.Component {
  state = {
    user: this.props.user
  };

  
  submitHandler = (event) => {
    event.preventDefault()
    axios
      .post("/api/users/imageupload", this.state )
      .then(response => {
        console.log(response.data); //Image URL!
      });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>CameraMobile</h1>
        <form onSubmit={this.submitHandler}>
          <input name="dataUri" onChange={this.changeHandler} type="file" accept="image/*" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(CameraMobile);
