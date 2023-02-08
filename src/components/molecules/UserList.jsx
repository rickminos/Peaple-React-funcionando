import React from "react";

import UserListItem from "./UserListItem";

function UserList(props) {
  return (
    <div className="">
      {props.users
        .sort((a, b) => a.fname.localeCompare(b.fname))
        .map((user) => (
          <UserListItem
            key={user._id}
            name={`${user.fname} ${user.lname}`}
            id={user._id}
          />
        ))}
    </div>
  );
}

export default UserList;
