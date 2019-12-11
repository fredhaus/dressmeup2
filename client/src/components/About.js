import React from 'react';
import { withRouter } from "react-router-dom"


class About extends React.Component {

  render() {
    return (
      <div style={{height:"100vh"}}>
        <img style={{width:"400px", borderRadius: "25px"}}src="https://i.imgur.com/vaT9ZNY.gif" alt=""/>
      </div>
    );
  }

}

export default withRouter(About);



