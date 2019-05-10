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

class ExploreCardsCom extends React.Component {
  state = {
    companies: []
  }

  componentDidMount() {
    this.getCompanies();
  };

  getCompanies() {
    API.getCompanies().then(companies => {
        this.setState({
          companies: [...companies.data]
        })
    })
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        {/* End hero unit */}
        {this.state.companies.length ? (
        <Grid container spacing={40}>
        
          {this.state.companies.map(company => (
            <Grid item key={company._id} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={company.picture}
                  title={company.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.name}
                  </Typography>
                  <Typography variant="body1">
                    Description: {company.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ImageModal 
                  info={company}
                  />
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

ExploreCardsCom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreCardsCom);