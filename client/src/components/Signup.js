import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ControlPointDuplicateTwoToneIcon from "@material-ui/icons/ControlPointDuplicateTwoTone";
class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post("/api/auth/signup", this.state)
      .then(response => {
        console.log("Signup", response.data);
        this.props.updateUser(response.data);
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error)
        // this.setState({
        // error: error.response.data.message
        // })
      });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        SIGNUP:
        <form onSubmit={this.submitHandler}>
          <input
            name="username"
            onChange={this.changeHandler}
            value={this.state.username}
            type="text"
            placeholder="username"
          ></input>
          <br></br>
          <input
            name="password"
            type="password"
            onChange={this.changeHandler}
            value={this.state.password}
            placeholder="password"
          ></input>
          {/* <p>{this.state.error}</p> */}
          <br></br>

          <button
            style={{ marginTop: "5px", border: "none", borderRadius: "10px" }}
            type="submit"
          >
            <ControlPointDuplicateTwoToneIcon
              style={{ color: "blue", width: "35px", height: "35px" }}
            />
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
