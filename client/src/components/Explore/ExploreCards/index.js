import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import API from "../../../utils/API";
import ImageModal from "../../ImageModal";

const cards = [];
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
for (let i = 0; i < 50; i++) {
  cards.push(i);
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class ExploreCards extends React.Component {
  state = {
    adSpaces: []
  }

  componentDidMount() {
    this.getAdSpaces();
  };

  getAdSpaces() {
    API.userAdSpaces().then(response => {
      const active = []
      response.data.forEach(adSpace => {
        if (adSpace.active) {
          active.push(adSpace)
        }
        this.setState({
          adSpaces: active
        })
      })
    })
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        {/* End hero unit */}
        {this.state.adSpaces.length ? (
        <Grid container spacing={40}>
        
          {this.state.adSpaces.map(adSpace => (
            <Grid item key={adSpace._id} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={adSpace.picture[0]}
                  title={adSpace.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {adSpace.title}
                  </Typography>
                  <Typography>
                    Description: {adSpace.description}
                  </Typography>
                  <Typography>
                    Location: {adSpace.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ImageModal />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        ): (
          <h3>No Results to Display</h3>
        )}
      </div>
    );
  }
};

ExploreCards.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreCards);