import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import DynamicFeedTwoToneIcon from "@material-ui/icons/DynamicFeedTwoTone";
import EmojiPeopleTwoToneIcon from "@material-ui/icons/EmojiPeopleTwoTone";
import StarHalfTwoToneIcon from '@material-ui/icons/StarHalfTwoTone';

const styles = {
  root: {},
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ [side]: open });
  };

  render() {
    const classes = this.props.classes;
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        <List>
          <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
            <ListItem button>
              <ListItemIcon>
                {" "}
                <EmojiPeopleTwoToneIcon style={{ color: "darkgoldenrod" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          {this.props.user && this.props.user.name ? (
            <Link style={{ textDecoration: "none", color: "black" }}>
              <ListItem button onClick={this.props.logouthandler}>
                <ListItemIcon>
                  {" "}
                  <ExitToAppTwoToneIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </Link>
          ) : (
            <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/login`}
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <AccountCircleTwoToneIcon style={{ color: "#506ffa" }} />{" "}
              </ListItemIcon>
              <ListItemText primary="Log in / Sign up" />
            </ListItem>
          </Link>
            
          )}
        </List>
        <Divider />
        <List>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/favorites`}
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <FavoriteTwoToneIcon style={{color: "red"}}/>{" "}
              </ListItemIcon>
              <ListItemText primary="My Outfits" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={`/feed`}>
            <ListItem button>
              <ListItemIcon>
                {" "}
                <DynamicFeedTwoToneIcon style={{color: "darkblue"}}/>{" "}
              </ListItemIcon>
              <ListItemText primary="Outfit Feed" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={`/about`}>
            <ListItem button>
              <ListItemIcon>
                {" "}
                <StarHalfTwoToneIcon style={{color: "blueviolet"}}/>
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    const fullList = side => (
      <div
        className={classes.fullList}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer("right", true)}>
          <img
            className="menuicon"
            src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575755635/menuIcon_nuqi5d.png"
            alt=""
          />
        </Button>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          {sideList("left")}
        </Drawer>
        <Drawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer("top", false)}
        >
          {fullList("top")}
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer("bottom", false)}
        >
          {fullList("bottom")}
        </Drawer>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          {sideList("right")}
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);
