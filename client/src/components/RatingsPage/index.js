import React from "react";
import RatingsBox from "./RatingsBox/RatingsBox";
import RatingsHeader from "./RatingsHeader/RatingsHeader";
// import Star from "@material-ui/icons/StarRate";

function RatingsPage(props) {
  // const { classes } = props;

  return (
    <div>
      <RatingsHeader info={props.user} />
      <RatingsBox
        info={props.user}
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        info={props.user}
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        info={props.user}
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
      <RatingsBox
        info={props.user}
        reviewTitle="Title"
        reviewContent="This is my review of #Username#. They were absolutely amazing! I give them 5 stars"
      />
    </div>
  );
}

// RatingsPage.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default RatingsPage;
