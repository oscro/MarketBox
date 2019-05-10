import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import ProfileTaskBar from "./UserProfileTaskBar";
import ProfileTopComponent from "./UserProfileTopComponent";


const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  }
});



function UserProfile(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Toolbar className={classes.toolbarMain}>
          {/* <Button size="small">Subscribe</Button> */}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            PROFILE
          </Typography>
          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          <Button variant="outlined" size="small">
            Message
          </Button>
        </Toolbar>
        <Toolbar variant="dense" className={classes.toolbarSecondary}>

        </Toolbar>
        <main>

          <ProfileTopComponent 
            info={props.user}
            act={props.active}
            inac={props.inactive}
          />

          {/* <ProfileTaskBar /> */}
          
        </main>
      </div>
    </React.Fragment>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
