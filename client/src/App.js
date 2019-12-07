import React from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import RandomClothes2 from "./components/RandomClothes_copy";
import Navbar from "./components/Navbar"

import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import Feed from "./components/Feed";

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
          <Navbar logouthandler={this.logouthandler}>

          </Navbar>
          <h1>
            Hello{" "}
            {this.state.loggedInUser
              ? this.state.loggedInUser.username
              : "Stranger"}{" "}
            !
          </h1>
          <br />
          {/* <button><Link to={`/`}>HOME</Link></button>
          <button onClick={this.logouthandler}>Logout</button>
          <button>
            <Link to={`/signup`}>Signup/Login</Link>
          </button>
          <button>
            <Link to={this.state.loggedInUser ? `/favorites` : "/signup"}>
              MY FAVORITES
            </Link>
          </button>
          <button>            
            <Link to={"/feed"}>
              FEEED
            </Link></button> */}

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
                )}}

            ></Route>
            <Route
              path="/feed"
              render={() => {
                return (
                  <div>
                    <Feed user={this.state.loggedInUser}></Feed>
                  </div>
                )}}

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
