import React from "react";
import "./like.css";
import PropTypes from "prop-types";

const Like = (props) => {
  const { liked, onClick } = props;

  const classes = liked ? "fa fa-heart" : "fa fa-heart-o";
  return <i className={classes} aria-hidden={liked} onClick={onClick}></i>;
};

Like.defaultProps = {
  liked: false,
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Like;
