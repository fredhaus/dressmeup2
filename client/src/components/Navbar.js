import React from 'react';
import { withRouter } from "react-router-dom"
import { Link, Redirect, Switch, Route } from "react-router-dom";

class Navbar extends React.Component {

  state = {
    user: this.props.user
  }

  render() {
    return (
      <div className="navbar">
          <button><Link to={`/`}>HOME</Link></button>
          <button onClick={this.props.logouthandler}>Logout</button>
          <button>
            <Link to={`/signup`}>Signup/Login</Link>
          </button>
          <button>
            <Link to={this.props.user? `/favorites` : "/signup"}>
              MY FAVORITES
            </Link>
          </button>
          <button>            
            <Link to={"/feed"}>
              FEEED
            </Link></button>
      </div>
    );
  }

}

export default withRouter(Navbar);
