import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "./Button";
import Typography from "./Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  "https://www.3m.com/wps/wcm/connect/59e1ecb4-7aca-4bcd-a2f9-b0acd36fc5e2/carWraps_1200.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-59e1ecb4-7aca-4bcd-a2f9-b0acd36fc5e2-mjhFien";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
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
        AdConnect
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
        size="large"
        className={classes.button}
        component={linkProps => (
          <Link
            {...linkProps}
            href="/premium-themes/onepirate/sign-up"
            variant="button"
          />
        )}
      >
        Register
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