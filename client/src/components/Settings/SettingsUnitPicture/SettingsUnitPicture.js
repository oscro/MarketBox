import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dropzone from 'react-dropzone';
import axios from "axios";

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
    file: []
  }

  onDrop = file=> {
    this.setState({file: [...this.state.file, ...file]});
  }

  handleInfo = () => {
    const fd = new FormData();
    fd.append("file", this.state.file[0]);
    axios.post("/auth/profilePic", fd, {headers: { 'Content-Type': 'multipart/form-data' }})
      .then(() => {
        alert("It was successfully saved!")
        this.props.changer();
      })
      .catch(err => console.log(err));
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
            <Dropzone accept="image/*"  onDrop={this.onDrop} className={classes.dropzone}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}  className={classes.dropzone}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop Profile Picture here, or click to select file</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
            </form>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary" onClick= {() => {
              this.handleInfo();
            }}>
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
