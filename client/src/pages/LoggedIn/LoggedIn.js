import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PermNav, VysHeader, VysContent, UserProfile, RatingsPage, Subscriptions, ImageModal } from "../../components/index";
import { SettingsMain } from "../../components/Settings";
import API from "../../utils/API";
import MessagesBody from "../../components/Messages/MessagesBody";
import Checkout from "../../components/Payments";
import { ExploreSearchBar, ExploreCards } from "../../components/Explore";


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
    adSpaces: []
  };

  componentDidMount() {
    this.getlogin();
  };

  handleSideNavClick = (event) => {
    this.getUser();
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
        user: response.data
      })
      console.log(this.state.user)
    })
  };

  // getAdSpaces() {
  //   API.userAdSpaces().then(response => {
  //     this.setState({
  //       adSpaces: response.data
  //     })
  //     console.log(this.state.adSpaces)
  //   })
  // }


  render() {
    const { classes } = this.props;
    const componentUse = () => {
      switch(this.state.current){
        case "View Your Spaces":
          return ([
          <VysHeader 
          key="VysHeader" 
          user={this.state.user}
          />,
          <VysContent 
          user={this.state.user}
          // adspaces={this.state.adSpaces} 
          key={this.state.user.adSpace._id} 
          /> 
        ]);

        case "Ratings":
          return (
          <RatingsPage 
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
          />
          );
        case "View Ad Space":
          return (
            [<ExploreSearchBar 
              key="ExploreSearchBar" 
              />,
          <ExploreCards 
          key="ExploreCards" 
          />]);
        case "View Co Listings":
          return (
            [<ExploreSearchBar 
              key="ExploreSearchBar" 
              />,
          <ExploreCards 
          key="ExploreCards" 
          />]
          );
        default:
          return (
          <UserProfile 
          key={this.state.current} 
          user={this.state.user} 
          />
          );
      }
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PermNav 
        sideNavClick={()=>this.handleSideNavClick}/>
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