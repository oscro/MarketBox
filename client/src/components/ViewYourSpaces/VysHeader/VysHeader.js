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
    active: [],
    inactive: [],
    show: [],
    value: 0
  };

  componentDidMount() {
    this.handleClick("active");
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(this.state.value)
  };

  handleClick = event => {
    let active = [];
    let inactive = [];
    this.props.user.adSpace.forEach(adSpace => {
      if (adSpace.active){
        active.push(adSpace)
      }else{
        inactive.push(adSpace)
      }
      this.setState({
        active: active,
        inactive: inactive
      })
    })
    if ( event === "used"){
      if (inactive.length === 0){
        this.setState({show: [{ 
          active: "",
          dateAdded: "",
          description: "",
          location: "",
          picture: [""],
          validated: false,
          __v: 0,
          _id: "",
          title: "You do not have any inactive AdSpaces"}]
        })
      }else{
        this.setState({show: [...this.state.inactive]})
      }
    }else if( event === "active"){
      this.setState({show: [...this.state.active]})
    }else{
      this.setState({show: [...this.props.user.adSpace]})
    }
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
              <Tab textColor="inherit" label="all" onClick={() => this.handleClick("all")}/>
              <Tab textColor="inherit" label="active" onClick={() => this.handleClick("active")}/>
              <Tab textColor="inherit" label="inactive" onClick={() => this.handleClick("used")}/>
            </Tabs>
          </AppBar>
        </React.Fragment>
        <VysContent
          user={this.props.user}
          value={this.state.show < 1 ? this.props.user.adSpace : this.state.show}
          key={this.state.show._id} 
          changer={() => {
            this.props.userUpdate()
          }}
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
