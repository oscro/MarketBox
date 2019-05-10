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
import ImageModal from "../../ImageModal";
import Button from "@material-ui/core/Button";
import SpaceModal from "../updateSpace/index"

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

function VysContent(props) {
  const { classes } = props;
  const cards = props.value;
  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {cards.map(card => (
            <Grid item key={card} sm={6} md={4} lg={3}>
              <Card className={classes.card} key={card._id}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.picture[0]}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography>
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ImageModal 
                    info={card}
                    key={card._id}
                  />
                  
                  {props.other === "active" ? 
                    <SpaceModal 
                      key={card._id}
                      _id={card._id}
                      changer={() => props.changer()}
                    />
                  :
                    ""
                  }    
                  {props.other === "active" ? 
                    <Typography color="inherit" variant="h5">
                      <Button color="inherit" onClick={() => props.onClick(card._id)}>Make Inactive</Button>
                    </Typography> 
                  :
                    ""
                  }
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </div>
  );
}

VysContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VysContent);