import React from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"
import device from "current-device"; //{console.log('device.mobile() === %s', device.mobile())} ==> True // False
import "typeface-roboto";
import SnackbarM from "./components/Snackbar_mui";
import "./App.css";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import axios from "axios";
import logo from "./logo.svg";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import RandomClothes2 from "./components/RandomClothes_copy";
import NavbarRS from "./components/NavbarRS";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import VolumeUpTwoToneIcon from "@material-ui/icons/VolumeUpTwoTone";
import VolumeOffTwoToneIcon from "@material-ui/icons/VolumeOffTwoTone";

// const [collapsed, setCollapsed] = useState(true);

// const toggleNavbar = () => setCollapsed(!collapsed);

class App extends React.Component {
  state = {
    loggedInUser: this.props.user,
    snackbar: false,
    mute: false
  };

  consoleLog = () => {
    console.log(this.state.mute);
  };

  toggleMute = () => {
    this.setState(prevState => ({
      mute: !prevState.mute
    }));
  };

  toggleSnackbar = () => {
    this.setState({
      snackbar: true
    });
  };

  updateUserImage = image => {
    let copy = { ...this.state.user };
    copy.headPic = image;

    this.setState(prevState => ({
      loggedInUser: copy
    }));
  };

  updateUserHandler = userObj => {
    this.setState({
      loggedInUser: userObj
    });
    console.log("APP.js", this.state.loggedInUser);
  };

  logouthandler = () => {
    axios.get("/api/auth/logout").then(response => {
      this.setState({
        loggedInUser: null
      });
    });
  };

  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Your Image is being updated!", "", 2500);
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };

  render() {
    return (
      <div>
        <div className="all">
          <Link to={`/`}>
            <img
              className="left dmulogo"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575754803/dmulogo_saeiru.png"
              alt=""
            />
          </Link>
          {!this.state.mute ? (
            <VolumeUpTwoToneIcon
              onClick={this.toggleMute}
              style={{
                width: "35px",
                height: "35px",
                marginTop: "17px",
                marginLeft: "10px",
                color: "crimson",
                opacity: "0.5"
              }}
            />
          ) : (
            //* <button onClick={this.toggleMute}>Mute</button> */}
            <VolumeOffTwoToneIcon onClick={this.toggleMute}               style={{
              width: "35px",
              height: "35px",
              marginTop: "17px",
              marginLeft: "10px",
              opacity: "0.5"
            }}/>
            // <button onClick={this.toggleMute}>UnMute</button>
          )}

          <div className="right flex">
            {/* <div style={{ margin: "10px" }}>
              Hello{" "}
              {this.state.loggedInUser
                ? this.state.loggedInUser.username
                : "Stranger"}{" "}
              !
            </div> */}
            <NavbarRS user={this.state.loggedInUser} logouthandler={this.logouthandler}></NavbarRS>

            <br></br>

            {/* <div className="break"></div> */}
          </div>
          <div className="break" style={{marginBottom: "10px"}}></div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <div>
                    <NotificationContainer />
                  </div>
                  {/* <RandomClothes user={this.state.loggedInUser} updateUserImage={this.updateUserImage}></RandomClothes> */}
                  <RandomClothes2
                    snackbar={this.createNotification("info")}
                    mute={this.state.mute}
                    toggleSnackbar={this.toggleSnackbar}
                    user={this.state.loggedInUser}
                    updateUserImage={this.updateUserImage}
                  ></RandomClothes2>
                </div>
              )}
            ></Route>
            <Route
              path="/login"
              render={() => {
                return (
                  <div>
                    <Login updateUser={this.updateUserHandler}></Login>
                    <div> ------------------------ </div>
                    <Signup updateUser={this.updateUserHandler}></Signup>
                  </div>
                );
              }}
            ></Route>
            <Route
              path="/favorites"
              render={() => {
                return (
                  <div>
                    <Favorites user={this.state.loggedInUser}></Favorites>
                  </div>
                );
              }}
            ></Route>
            <Route
              path="/feed"
              render={() => {
                return (
                  <div>
                    <Feed user={this.state.loggedInUser}></Feed>
                  </div>
                );
              }}
            ></Route>
            {/* <Route
              exact
              path="/:id"
              render={() => (
                <div>
                  <RandomClothes2
                    user={this.state.loggedInUser}
                    updateUserImage={this.updateUserImage}
                  ></RandomClothes2>
                </div>
              )}
            ></Route> */}
            <Route
              path="/about"
              render={() => {
                return (
                  <div>
                    <About></About>
                  </div>
                );
              }}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
