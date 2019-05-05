import React from "react";
import Link from '@material-ui/core/Link';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  loginButton: {
    zIndex: 1000
  }
};

function Navbar(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          <Link href ="/"
          variant="h6"
          underline="none"
          color="inherit">
          {/* <img className={classes.logo} src="./assets/MarketBoxLogo/MarketBoxIconPNG.png" alt="golf"/> */}
            MarketBox
          </Link>
          </Typography>
          {/* <LoginMenuButton/> */}
          {/* <Button color="inherit">View Ad Space</Button>
          <Button color="inherit">View Company Listings</Button> */}
          <Button className={classes.loginButton} color="inherit" href="/signin">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);