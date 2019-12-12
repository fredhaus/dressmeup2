import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import FeedGallerySingle from "./FeedGallerySingle";
import _ from "lodash";
import NewReleasesTwoToneIcon from '@material-ui/icons/NewReleasesTwoTone';

class Feed extends React.Component {
  state = {
    user: this.props.user,
    outfits: [],
    isLoading: true
  };

  getAllOutfits = () => {
    axios.get("/api/garments/alloutfits", this.state).then(response => {
      let newData = _.shuffle(response.data)
      // console.log(response)
      this.setState({ outfits: newData, isLoading: false }); // this triggers a re-render
    });
  };

  componentDidMount() {
    this.getAllOutfits();         
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="cardwrapper">
        <div className="sectionHead"> 
        <h3><NewReleasesTwoToneIcon style={{width: "35px", height: "35px", color: "orange"}}></NewReleasesTwoToneIcon>
           Feed 
          <NewReleasesTwoToneIcon style={{width: "35px", height: "35px", color: "orange"}}></NewReleasesTwoToneIcon></h3></div>
        <div className="break"></div>
        {this.state.outfits.map((outfit, i) => {
          return (
            <FeedGallerySingle
              key={i}
              user={this.props.user}
              outfits={outfit}
            ></FeedGallerySingle>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Feed);
