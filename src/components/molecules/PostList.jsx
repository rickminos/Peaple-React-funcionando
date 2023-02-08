import React from "react";

import PostListItem from "./PostListItem";

export default function PostList(props) {
  return (
    <div className="user-blog__posts">
      {props.posts.map((post) => (
        <PostListItem
          key={post.id}
          userId={post.userId}
          postId={post.id}
          title={post.title}
          description={post.description}
          createdAt={post.createdAt}
        />
      ))}
      <div classname="pos-post">.</div>
    </div>
  );
}
