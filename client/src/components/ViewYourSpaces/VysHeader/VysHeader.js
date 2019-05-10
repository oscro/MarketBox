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
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import VysContent from "../VysContent/VysContent"
import API from "../../../utils/API";

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

class VysHeader extends React.Component {
  state = {
    show: "active",
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleInactive = id => {
    API.makeInactive(id)
    .then(res => {
      console.log(res)
      alert("This ad is now inactive!")
      this.props.userUpdate()
    })
    .catch(err => console.log(err));
  }

  render (){ 

    const { classes } = this.props;

    return (
      <div>
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
                    Stored Spaces
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
          <AppBar
            component="div"
            className={classes.secondaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Tabs  value={this.state.value} textColor="inherit" onChange={this.handleChange}>
              <Tab textColor="inherit" label="active" onClick={() => this.setState({show: "active"})}/>
              <Tab textColor="inherit" label="inactive" onClick={() => this.setState({show: "inactive"})}/>
            </Tabs>
          </AppBar>
        </React.Fragment>
        <VysContent
          user={this.props.user}
          value={this.state.show === "active" ? this.props.user.active : this.props.user.inactive}
          other={this.state.show}
          changer={() => this.props.userUpdate()}
          onClick={id => this.handleInactive(id)}
        /> 
      </div>
    );
  }
}


VysHeader.propTypes = {
  classes: PropTypes.object.isRequired
  // onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(VysHeader);
