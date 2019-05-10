import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import API from "../../../utils/API";
import Dropzone from 'react-dropzone';
import axios from "axios";

const lightColor = "rgba(255, 255, 255, 0.7)";

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

class SpaceUpdate extends React.Component {
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
    
      handlePicture = () => {
          console.log(this.props._id)
        // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const fd = new FormData();
        for(var i = 0; i < this.state.file.length; i++){
          fd.append("file", this.state.file[i]);
        }
        fd.append("_id", this.props._id);
    
        axios.post("/auth/adPictureAdd", fd, {headers: { 'Content-Type': 'multipart/form-data' }})
          .then(() => {
            alert("It was successfully saved!")
            this.handleClose();
          })
          .catch(err => console.log(err));
      }

    handleInfo = event => {
        console.log(event)
        const id = this.props._id
        // const update = {[event]: this.state.}


        // API.updateAd(id,update)
        //     .then(() => {
        //         alert("It was successfully saved!")
        //         this.setState({
        //             [name]: ""
        //         })
        //     })
        //     .catch(err => console.log(err));
    }

  render(){
    const { classes } = this.props;
    const file = this.state.file.map(file => (
      <li key={file.name}></li>
    ));
    return (
        <div>
             <Typography color="inherit" variant="h5">
                <Button color="inherit" onClick={this.handleClickOpen}>Update Space</Button>
              </Typography>

              <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  fullWidth={true}
                  maxWidth="xl"
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Update your Space</DialogTitle>
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
                    <DialogActions>
                        <Button onClick={() => this.handleInfo("title")} color="primary">
                           Update
                        </Button>
                    </DialogActions>

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
                    <DialogActions>
                        <Button onClick={() => this.handleInfo("location")} color="primary">
                           Update
                        </Button>
                    </DialogActions>

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
                    <DialogActions>
                        <Button onClick={() => this.handleInfo("description")} color="primary">
                           Update
                        </Button>
                    </DialogActions>

                  <DialogContentText>
                    Picture
                  </DialogContentText>
                  <Dropzone accept="image/*"  onDrop={this.onDrop} className={classes.dropzone}>
                    {({ getRootProps, getInputProps }) => (
                      <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}  className={classes.dropzone}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop picture here, or click to select files. Only one picture will upload at a time.</p>
                        </div>
                        <aside>
                          <h4>Files</h4>
                          <ul>{file}</ul>
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handlePicture} color="primary">
                        Add Picture
                    </Button>
                  </DialogActions>


                  </DialogContent>
                </Dialog>

        </div>
    )
  }
}


SpaceUpdate.propTypes = {
  classes: PropTypes.object.isRequired
  // onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles) (SpaceUpdate);