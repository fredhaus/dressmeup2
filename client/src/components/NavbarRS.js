import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, styled } from "@material-ui/core/styles";

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
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import DynamicFeedTwoToneIcon from '@material-ui/icons/DynamicFeedTwoTone';

const useStyles = makeStyles({
  root: {
    
  },
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  }
});



export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link style={{ textDecoration: "none", color: "red" }} to={`/signup`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <AccountCircleTwoToneIcon style={{ color: "red" }}/>{" "}
            </ListItemIcon>
            <ListItemText primary="Log in" />
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "black" }} to={`/signup`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <WbSunnyTwoToneIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Sign up" />
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "black" }} to={`/feed`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <ExitToAppTwoToneIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/favorites`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <FavoriteTwoToneIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="My Outfits" />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={`/feed`}>
        <ListItem button>
            <ListItemIcon>
              {" "}
              <DynamicFeedTwoToneIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Outfit Feed" />
          </ListItem>
        </Link>
        </List>
        
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
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
<Button onClick={toggleDrawer("right", true)}><img className="menuicon" src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575755635/menuIcon_nuqi5d.png" alt=""/></Button>

      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer("top", false)}
      >
        {fullList("top")}
      </Drawer>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        {fullList("bottom")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
