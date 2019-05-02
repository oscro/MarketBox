import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import API from "../../../utils/API";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "2%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center",
    display: "block"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

class DetailedExpansionPanel extends React.Component {
  state = {
    info: ""
  }

  handleInfo = () => {
    const name = this.props.name;
    const value = this.state.info
    const user = {[name]: value};
    API.saveUser(user)
      .then(() => {
        alert("It was successfully saved!")
        this.setState({
          info: ""
        })
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({
      info: event
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{this.props.settingslabel}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {this.props.info}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <form noValidate autoComplete="off" >
            <TextField
              onChange={event => this.handleChange(event.target.value)}
              value={this.state.info}
              id="outlined-full-width"
              label="Enter Your Info Here"
              style={{ margin: 8 }}
              placeholder="Click Me to Begin Writing"
              name='info'
              // helperText="Full width!"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            </form>
            {/* <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice
                <br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
                </a>
              </Typography>
            </div> */}
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary" onClick={this.handleInfo}>
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);
