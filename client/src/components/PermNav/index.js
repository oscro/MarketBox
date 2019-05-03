import React from "react";
import { Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import BottomAppBar from "./BottomAppBar";

//ICONS
// import Fab from "../Fab";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat"
import Grade from "@material-ui/icons/Grade";
import Payment from "@material-ui/icons/Payment";
import Autorenew from "@material-ui/icons/Autorenew";
import SettingsIcon from "@material-ui/icons/Settings";
import API from "../../utils/API";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  navbuttons: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  }
});

const categories = [
  {
    id: "# USER NAME",
    children: [
      { id: "Profile", icon: <PeopleIcon />, active: true },
      { id: "View Your Spaces", icon: <DnsRoundedIcon /> },
      { id: "Messages", icon: <Chat /> },
      { id: "Ratings", icon: <Grade /> }
      // ,
      // { id: "Functions", icon: <SettingsEthernetIcon /> },
      // { id: "ML Kit", icon: <SettingsInputComponentIcon /> }
    ]
  },
  {
    id: "Account",
    children: [
      { id: "Payments", icon: <Payment /> },
      { id: "Subscriptions", icon: <Autorenew /> },
      { id: "Settings", icon: <SettingsIcon /> }
      // ,
      // { id: "Performance", icon: <TimerIcon /> },
      // { id: "Test Lab", icon: <PhonelinkSetupIcon /> }
    ]
  }
];

class SideBarNav extends React.Component {
  state = {
    open: false,
    redirect: false,
    modal: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  handleSignOut = ()=> {
    API.logout()
      .then(res => {
        console.log(res);
        if (res.data.msg == "logging you out"){
          this.setState({
            redirect: true
          })
        }
      })
      .catch(err => console.log(err));
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
      {this.renderRedirect()}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" color="inherit" noWrap>
                        ORYUS
                        </Typography> */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link href="/" variant="h6" underline="none" color="inherit">
                MarketBox
              </Link>
            </Typography>
            <Button color="inherit" className={classes.navbuttons} pagecontent="View Ad Space" onClick={this.props.sideNavClick()}>
              View Ad Space
            </Button>
            <Button color="inherit" pagecontent="View Co Listings" onClick={this.props.sideNavClick()}>View Company Listings</Button>
            <Button onClick={this.handleSignOut} color="inherit">Sign Out</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              {children.map(({ id: childId, icon, active }) => (
                <ListItem
                  button
                  dense
                  key={childId}
                  pagecontent={childId}
                  onClick={this.props.sideNavClick()}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    active && classes.itemActiveItem
                  )}
                >
                  <ListItemIcon
                  pagecontent={childId}
                  >{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
          {/* <BottomAppBar /> */}
          {/* <div>
          <Divider />
          <Divider />
          <Fab />
          <Divider />
          <Divider />
          </div> */}
          <BottomAppBar />
        </Drawer>
        
      </div>
    );
  }
}

SideBarNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SideBarNav);

