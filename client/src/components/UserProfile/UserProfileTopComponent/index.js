import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Moment from 'react-moment';

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    width: "50%",
    padding: 200,
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)"
  },
  cardContent: {
    flexGrow: 1
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    open: false,
    file: [],
    title: "",
    location: "",
    description: ""
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
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
        this.props.changer();
        this.handleClose();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const dateToFormat = this.props.info.dateAdded;
    
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              M
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon onClick={this.handleClickOpen}/>
            </IconButton>
          }
          title={this.props.info.username}
          subheader={ <Moment format="MMM YYYY" >{dateToFormat}</Moment> }
        />

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
                  <Dropzone accept="image/*"  onDrop={this.onDrop} className={classes.dropzone}>
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


        <CardMedia
          style={{resizeMode: 'contain'}}
          className={classes.cardMedia}
          image={this.props.info.picture}
          title="Profile Image"
        />
        <CardContent className={classes.cardContent}>
          <Grid container spacing={16}>

            <Grid item xs={9}>
              <Typography component="p">Name: {this.props.info.name}</Typography>
              <Typography component="p">Location: {this.props.info.address}</Typography>
            </Grid>
            <Grid item xs={3}>
              {this.props.info.group === "provider" ? (
                  <div>
                      <Typography component="p">Active Ad-Spaces: {this.props.act}</Typography>
                      <Typography component="p">Inactive Ad-Spaces: {this.props.inac}</Typography>
                  </div>
              ):(
                  <div>
                    <Typography component="p">Favorited Ad-Spaces: {this.props.info.favorites > 0 ? this.props.info.favorites.length : 0}</Typography>
                    <Typography component="p">Purchased Ad-Spaces: {this.props.info.used > 0 ? this.props.info.used.length : 0}</Typography>
                  </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>
              {this.props.info.description}
            </Typography>
            
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);