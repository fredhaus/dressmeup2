import React from 'react';
import { withRouter } from "react-router-dom"


class About extends React.Component {

  render() {
    return (
      <div style={{height:"100vh"}}>
        <br/>
        <span>
        MERN web application as part of<br/>IronHack Web Development Course <br/>
        <b><a href="https://hausburg.net" target="_blank" rel="noopener noreferrer">Hausburg.net</a></b>
        </span><br/><br/><br/>
        <img style={{width:"300px", borderRadius: "25px"}}src="https://i.imgur.com/vaT9ZNY.gif" alt=""/>
      </div>
    );
  }

}

export default withRouter(About);



