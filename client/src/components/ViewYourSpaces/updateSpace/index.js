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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import API from "../../utils/API";

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

class SpaceUpdate extends React.Component {
  state = {
    open: false,
    value: 0,
    show: [...this.props.user.ratings],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    overAll: 0,
    title: "",
    msg: "",
    score: ""
  };

  componentDidMount() {
    const one = [];
    const two = [];
    const three = [];
    const four = [];
    const five = [];
    let count = 0;
    let sum = 0;

    if (this.props.user.ratings.length >= 1){
    this.props.user.ratings.forEach(rate => {
        sum = rate.score + sum;
        count = count + 1;

        if (rate.score === 1){
          one.push(rate)
        }else if(rate.score === 2){
          two.push(rate)
        }else if(rate.score === 3){
          three.push(rate)
        }else if(rate.score === 4){
          four.push(rate)
        }else{
          five.push(rate)
        }
        
      })
      let overAll = sum/count;
      this.setState({
        overAll: overAll,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five
      })
    }else{
      this.setState({
        show: [{
          score: 0,
          msg: "",
          title: "This user does not have any ratings yet.",
          from: ""
        }]
      })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    const { name, value } = event;
    this.setState({
      [name]: value
    })
  }

  handleClose = () => {
    this.setState({ open: false });
    this.setState({
      open: false,
      title: "",
      msg: "",
      score: ""
    })
  };

  handleClick = event => {
    if (event === "one"){
      this.setState({
        show: [...this.state.one]
      })
    }else if(event === "two"){
      this.setState({
        show: [...this.state.two]
      })
    }else if(event === "three"){
      this.setState({
        show: [...this.state.three]
      })
    }else if(event === "four"){
      this.setState({
        show: [...this.state.four]
      })
    }else if(event === "all"){
      this.setState({
        show: [...this.props.user.ratings]
      })
    }else{
      this.setState({
        show: [...this.state.five]
      })
    }
    if (this.props.user.ratings < 1){
      this.setState({
        show: [{
          score: 0,
          msg: "",
          title: "This user does not have any ratings yet.",
          from: ""
        }]
      })
    }
  }

  handleTabs = (event, value) => {
    this.setState({ value });
  };

  handleInfo = () => {
    const review = {
      title: this.state.title,
      msg: this.state.msg,
      score: this.state.score
    }
    API.saveReview(review)
      .then(() => {
        alert("It was successfully saved!")
        this.setState({
          title: "",
          msg: "",
          score: ""
        })
        this.handleClose()
      })
      .catch(err => console.log(err));
  }

  render(){
    const { classes } = this.props;

    return (
        <div>
            <Typography color="inherit" variant="h5">
                <Button color="inherit" onClick={this.handleClickOpen}>Leave a Review</Button>
            </Typography>

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth="xl"
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Leave a Review</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Headline
                </DialogContentText>
                <TextField
                    onChange={event => this.handleChange(event.target)}
                    value={this.state.title}
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Headline"
                    type="title"
                    fullWidth
                />
                <DialogContentText>
                    Comments
                </DialogContentText>
                <TextField
                    onChange={event => this.handleChange(event.target)}
                    value={this.state.msg}
                    margin="dense"
                    name="msg"
                    id="msg"
                    label="Your Comments"
                    type="msg"
                    fullWidth
                />
                <DialogContentText>
                    How would you Rate your experience 1 to 5
                </DialogContentText>
                <TextField
                    onChange={event => this.handleChange(event.target)}
                    value={this.state.score}
                    margin="dense"
                    name="score"
                    id="score"
                    label="1-5"
                    type="score"
                    fullWidth
                />
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
        </div>
    )
  }
}


SpaceUpdate.propTypes = {
  classes: PropTypes.object.isRequired
  // onDrawerToggle: PropTypes.func.isRequired
};

export default SpaceUpdate;