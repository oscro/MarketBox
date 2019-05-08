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
import VysContentCom from "../VysContentCom/VysContentCom";
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

  // const { classes } = props;

  state = {
    value: []
  };

  handleClick = (event) => {
    if(event === "favorites"){
      this.setState({value: this.props.user.favorites})
    }else{
      this.setState({value: this.props.user.used})
    }
  };

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
        <Tabs   textColor="inherit">
          <Tab textColor="inherit" label="Favorite" onClick={() => this.handleClick("favorite")}/>
          <Tab textColor="inherit" label="Purchased" onClick={() => this.handleClick("used")}/>
          
        </Tabs>
      </AppBar>
    </React.Fragment>
    
      <VysContentCom
        user={this.props.user}
        value={this.state.value}
        key={this.props.user._id} 
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
