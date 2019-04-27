import React from "react";
import PropTypes from "prop-types";
import RatingsBox from "./RatingsBox";
import UserProfile from "../DashboardHeader";
// import Star from "@material-ui/icons/StarRate";

function RatingsPage(props) {
  const { classes } = props;

  return (
    <div>
      <UserProfile />
      <RatingsBox
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
    </div>
  );
}

RatingsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RatingsPage;
