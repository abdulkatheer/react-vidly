import React from "react";
import "./like.css";

const Like = (props) => {
  const classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={classes}
      aria-hidden={props.liked}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
