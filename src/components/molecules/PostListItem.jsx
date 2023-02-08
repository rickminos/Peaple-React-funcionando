import React from "react";
import { getFriendlyDate } from "../../helpers/Date";

export default function PostListItem(props) {
  return (
    <h2 className="post-container">
      <div className="post-title">{props.title}</div>
      <div className="post-text">{props.description}</div>
      <div className="post-date">{getFriendlyDate(props.createdAt)}</div>
    </h2>
  );
}
