import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PermNav, VysHeader, VysHeaderCom, UserProfile, RatingsHeader, Subscriptions, ImageModal } from "../../components/index";
import { SettingsMain } from "../../components/Settings";
import API from "../../utils/API";
import MessagesBody from "../../components/Messages/MessagesBody";
import Checkout from "../../components/Payments";
import { ExploreSearchBar, ExploreCards, ExploreCardsCom, ExploreSearchBarCom  } from "../../components/Explore";


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
  }
});

class LoggedContainer extends React.Component {

  state = {
    current: "",
    user: [],
    active: 0,
    inactive: 0
  };

  componentDidMount() {
    this.getlogin();
  };

  handleSideNavClick = (event) => {
    let pagecontent = event.currentTarget.getAttribute("pagecontent");
    this.setState({ current: pagecontent });
  };

  getlogin(){
    API.signedIn().then(response => {
        if (response.data.user === null) {
            this.props.history.push('/signin')
        }else{
          this.getUser();
        }
    })
  };

  getUser() {
    API.userInfo().then(response => {
      this.setState({
        user: response.data,
        active: 0,
        inactive: 0
      })
      response.data.adSpace.forEach(adSpace => {
        if(adSpace.active) {
          this.setState({
            active: this.state.active + 1
          })
        }else{
          this.setState({
            inactive: this.state.inactive +1
          })
        }
      })
      // this.forceUpdate()
    })
  };

  render() {
    const { classes } = this.props;
    const componentUse = () => {
      switch(this.state.current){
        case "View Your Spaces": 
          if (this.state.user.group === "company"){
            return (
              <VysHeaderCom
                key="VysHeadercom" 
                user={this.state.user}
              />
            )
          }else{
            return (
              <VysHeader
                key="VysHeader" 
                user={this.state.user}
              />
            )
          };

        case "Ratings":
          return (
            <RatingsHeader 
              key={this.state.current} 
              user={this.state.user} 
            />
          );
        case "Profile": 
          return (
          <React.Fragment>
            <ImageModal />
            <UserProfile 
              key={this.state.current} 
              user={this.state.user} 
              active={this.state.active}
              inactive={this.state.inactive}
            />
          </React.Fragment>);
        case "Subscriptions":
          return (
            <Subscriptions 
              key={this.state.current} 
              user={this.state.user} 
            />
          );
        case "Messages":
          return (
            <MessagesBody 
              key={this.state.current} 
              user={this.state.user} 
            />
          );
        case "Payments":
          return (
            <Checkout 
              key={this.state.current} 
              user={this.state.user} 
            />
          );
        case "Settings":
          return ( 
            <SettingsMain 
              key={this.state.current}
              user={this.state.user} 
              userUpdate={() => this.getUser()}
            />
          );
        case "View Ad Space":
          return ([
            <ExploreSearchBar 
              key="ExploreSearchBar" 
            />,
            <ExploreCards 
              key="ExploreCards" 
            />
          ]);
        case "View Co Listings":
          return ([
            <ExploreSearchBarCom
              key="ExploreSearchBar" 
            />,
            <ExploreCardsCom
              key="ExploreCards" 
            />
        ]);
        default:
          return (
            <UserProfile 
              key={this.state.current} 
              user={this.state.user} 
              active={this.state.active}
              inactive={this.state.inactive}
              
            />
          );
      }
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PermNav 
          sideNavClick={()=>this.handleSideNavClick}
          user={this.state.user}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            {componentUse()}
          </div>
        </main>
      </div>
    );
  }
}

LoggedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LoggedContainer);