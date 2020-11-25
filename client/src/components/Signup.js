import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ControlPointDuplicateTwoToneIcon from "@material-ui/icons/ControlPointDuplicateTwoTone";
class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    confirmed: "",
  };

  submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/api/auth/signup", this.state)
      .then((response) => {
        console.log("Signup", response.data);
        this.props.updateUser(response.data);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.message,
        });
      });
  };

  // 8 Charactrs, one Capital, one Number
  alphanumeric = (string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(string);
  };

  changeHandler = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.setState(
          {
            confirmed: this.alphanumeric(this.state.password),
          },
        );
      }
    );
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
          <br></br>

          {this.state.confirmed ? (
            <button
              style={{ marginTop: "5px", border: "none", borderRadius: "10px" }}
              type="submit"
            >
              <ControlPointDuplicateTwoToneIcon
                style={{ color: "blue", width: "35px", height: "35px" }}
              />
            </button>
          ) : (
            <ControlPointDuplicateTwoToneIcon
              style={{
                color: "blue",
                marginTop: "5px",
                border: "none",
                borderRadius: "10px",
                width: "35px",
                height: "35px",
                opacity: "0.2",
              }}
            />
          )}
          <br />
          {this.state.error ? (
            <div>
              <span style={{ color: "red" }}>
                <b>This username is already taken.</b>
                <br />
                Please choose another username
              </span>
            </div>
          ) : (
            ""
          )}
          {this.state.password ? (
            <div>
              {this.state.confirmed ? (
                <div>
                  <span style={{ color: "green" }}>
                    Password must contain <br />
                    <b>8 Characters, one Capital Letter, one Number</b>
                  </span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "red" }}>
                    Password must contain <br />
                    <b>8 Characters, one Capital Letter, one Number</b>
                  </span>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
