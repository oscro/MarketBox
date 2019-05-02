import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    width: "100%"
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  image: {
      width: '80%',
      height: "auto"
  }
});


function BottomAppBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Fab color="secondary" onClick={props.handleaction} aria-label="Add" className={classes.fabButton}>
            <AddIcon />
            {/* <img className={classes.image} src="../assets/MarketBoxLogo/MarketBoxIconPNG.png" alt="icon" /> */}
          </Fab>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);