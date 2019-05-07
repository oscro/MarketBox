import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import API from "../../utils/API";
import axios from "axios";

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
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  }
});

class BottomAppBar extends React.Component {
  state = {
    open: false,
    file: [],
    title: "",
    location: "",
    description: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({
      open: false,
      file: [],
      title: "",
      location: "",
      description: ""
    })
  };

  onDrop = file=> {
  
    this.setState({file: [...this.state.file, ...file]});
  }

  handleChange = event => {
    const { name, value } = event;
    this.setState({
      [name]: value
    })
  }

  handleInfo = () => {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const fd = new FormData();
    for(var i = 0; i < this.state.file.length; i++){
      fd.append("file", this.state.file[i]);
    }
    fd.append("title", this.state.title);
    fd.append("location", this.state.location);
    fd.append("description", this.state.description);

    axios.post("/auth/upload", fd, {headers: { 'Content-Type': 'multipart/form-data' }})
      .then(() => {
        alert("It was successfully saved!")
        this.handleClose();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const file = this.state.file.map(file => (
      <li key={file.name}>
      </li>
    ));
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={this.handleClickOpen}>
              <AddIcon />
              {/* <img className={classes.image} src="../assets/MarketBoxLogo/MarketBoxIconPNG.png" alt="icon" /> */}
            </Fab>
            {/* <form action="/profile" method="post" enctype="multipart/form-data"> */}
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
                  onChange={event => this.handleChange(event.target)}
                  value={this.state.title}
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="Title of Your Ad-Space"
                  type="title"
                  fullWidth
                />
                <DialogContentText>
                  Location
                </DialogContentText>
                <TextField
                  onChange={event => this.handleChange(event.target)}
                  value={this.state.location}
                  margin="dense"
                  name="location"
                  id="location"
                  label="Location of Your Ad-Space"
                  type="location"
                  fullWidth
                />
                <DialogContentText>
                  Description
                </DialogContentText>
                <TextField
                  onChange={event => this.handleChange(event.target)}
                  value={this.state.description}
                  margin="dense"
                  name="description"
                  id="description"
                  label="Describe Your Ad-Space"
                  type="description"
                  fullWidth
                />
                <DialogContentText>
                  Picture
                </DialogContentText>
                <Dropzone multiple accept="image/*"  onDrop={this.onDrop} className={classes.dropzone}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}  className={classes.dropzone}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop pictures here, or click to select files</p>
                      </div>
                      <aside>
                        <h4>Files</h4>
                        <ul>{file}</ul>
                      </aside>
                    </section>
                  )}
                </Dropzone>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={this.handleInfo} color="primary">
                      Save
                  </Button>
                </DialogActions>
              </Dialog>
            {/* </form> */}
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