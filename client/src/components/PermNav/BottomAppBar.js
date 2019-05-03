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

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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


class BottomAppBar extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={this.handleClickOpen}>
              <AddIcon />
              {/* <img className={classes.image} src="../assets/MarketBoxLogo/MarketBoxIconPNG.png" alt="icon" /> */}
            </Fab>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth={true}
            maxWidth="xl"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add a Space</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Title
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title of Your Ad-Space"
                type="title"
                fullWidth
              />
               <DialogContentText>
                Location
              </DialogContentText>
              <TextField
                margin="dense"
                id="location"
                label="Location of Your Ad-Space"
                type="location"
                fullWidth
              />
               <DialogContentText>
                Description
              </DialogContentText>
              <TextField
                margin="dense"
                id="description"
                label="Describe Your Ad-Space"
                type="description"
                fullWidth
              />
               <DialogContentText>
                Picture
              </DialogContentText>
              <TextField
                margin="dense"
                id="picture"
                label="Submit a Picture of your Space"
                type="title"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);