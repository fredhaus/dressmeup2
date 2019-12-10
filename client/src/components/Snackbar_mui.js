import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { withStyles } from "@material-ui/core/styles";

export default class CustomizedSnackbars extends React.Component {
  state = {
    open: true
  }
  
  handleClick = () => {
    this.setState({
      open: true
    })
    
  };

  handleClose = (event, reason) => {
    this.setState({
      open: false
    })

  };
  render() {
    return (
      <div>
        {/* <Button variant="outlined" className={classes.margin} onClick={handleClick}>
        Open success snackbar
      </Button> */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.state.handleClose}
        >
          <MySnackbarContentWrapper
          // autoHideDuration={3000}
            onClose={this.state.handleClose}
            variant="success"
            message="Your Picture is being updated!"
          />
        </Snackbar>
      </div>
    );
  }
}
