import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SettingsUnit from "../SettingsUnit/SettingsUnit";
import SettingsUnitPicture from "../SettingsUnitPicture/SettingsUnitPicture";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

class SettingsHeader extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={8} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    // onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <Typography className={classes.link} component="a" href="#">
                  {this.props.user.username}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Alerts • No alters">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                  <Avatar
                    className={classes.avatar}
                    src={this.props.user.picture}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                  Settings
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

          <SettingsUnit name="name" info={this.props.user.name} settingslabel="Full Name" settingsdescription="Enter Your Full Name" changer={() => this.props.userUpdate()}/>
          <SettingsUnit name="email" info={this.props.user.email} settingslabel="Email" settingsdescription="Enter Your Email" changer={() => this.props.userUpdate()}/>
          <SettingsUnitPicture name="picture" settingslabel="Profile Picture" settingsdescription="Upload Your Profile Picture" changer={() => this.props.userUpdate()}/>
          <SettingsUnit name="phone" info={this.props.user.phone} settingslabel="Phone Number" settingsdescription="Enter Your Phone Number" changer={() => this.props.userUpdate()}/>
          <SettingsUnit name="address" info={this.props.user.address} settingslabel="City, State" settingsdescription="Enter Your City and State" changer={() => this.props.userUpdate()}/>
          <SettingsUnit name="description" info={this.props.user.description} settingslabel="Description" settingsdescription="Enter Your Description" changer={() => this.props.userUpdate()}/>

      </React.Fragment>
    );
  }
}

SettingsHeader.propTypes = {
  classes: PropTypes.object.isRequired
  // onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsHeader);