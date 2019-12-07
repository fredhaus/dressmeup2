import React from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"
import device from "current-device"; //{console.log('device.mobile() === %s', device.mobile())} ==> True // False
import "typeface-roboto";

import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import axios from "axios";
import logo from "./logo.svg";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import RandomClothes2 from "./components/RandomClothes_copy";
import NavbarRS from "./components/NavbarRS";

// const [collapsed, setCollapsed] = useState(true);

// const toggleNavbar = () => setCollapsed(!collapsed);

class App extends React.Component {
  state = {
    loggedInUser: this.props.user
  };

  updateUserImage = image => {
    let copy = { ...this.state.user };
    copy.headPic = image;

    this.setState({
      loggedInUser: copy
    });
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
        loggedInUser: ""
      });
    });
  };

  render() {
    return (
      <div>
        <div className="all">
        <Link to={`/`}>
        <img className="left dmulogo" src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575754803/dmulogo_saeiru.png" alt=""/>
        </Link>
          <div className="right">
            <NavbarRS></NavbarRS>
          </div>
          
            
          
          {/* <Navbar logouthandler={this.logouthandler} user={this.state.loggedInUser}>

          </Navbar> */}

          <div className="break"></div>
          <h6>
            Hello{" "}
            {this.state.loggedInUser
              ? this.state.loggedInUser.username
              : "Stranger"}{" "}
            !
          </h6>
          <br />

          <div className="break"></div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  {/* <RandomClothes user={this.state.loggedInUser} updateUserImage={this.updateUserImage}></RandomClothes> */}
                  <RandomClothes2
                    user={this.state.loggedInUser}
                    updateUserImage={this.updateUserImage}
                  ></RandomClothes2>
                </div>
              )}
            ></Route>
            <Route
              path="/signup"
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
            <Route
              exact
              path="/:id"
              render={() => (
                <div>
                  {/* <RandomClothes user={this.state.loggedInUser} updateUserImage={this.updateUserImage}></RandomClothes> */}
                  <RandomClothes2
                    user={this.state.loggedInUser}
                    updateUserImage={this.updateUserImage}
                  ></RandomClothes2>
                </div>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
