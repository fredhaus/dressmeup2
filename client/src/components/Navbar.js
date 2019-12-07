import React from 'react';
import { withRouter } from "react-router-dom"

class Navbar extends React.Component {

  state = {
    user: this.props.user
  }

  render() {
    return (
      <div className="navbar">
        MoinMoinMoinMoinMoinMoinMoinMoinMoinMoinMoin
      </div>
    );
  }

}

export default withRouter(Navbar);
