import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "../Material/modules/components/Button";
import Typography from "../Material/modules/components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  // "https://images.pexels.com/photos/1024613/pexels-photo-1024613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  "https://images.pexels.com/photos/374016/pexels-photo-374016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200,
    margin: theme.spacing.unit
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 10
    }
  },
  more: {
    marginTop: theme.spacing.unit * 2
  }
});

function Jumbotron(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: "none" }} src={backgroundImage} alt="" />
      
      <Typography color="inherit" align="center" variant="h2" marked="center">
        MarketBox
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Connecting Ad-Space to Ad-Content
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        className={classes.button}
        component={linkProps => (
          <Link
            {...linkProps}
            href="/signup/company"
            variant="button"
          />
        )}
      >
        Business Sign Up
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        className={classes.button}
        component={linkProps => (
          <Link
            {...linkProps}
            href="/signup/user"
            variant="button"
          />
        )}
      >
        User Sign Up
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

Jumbotron.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Jumbotron);