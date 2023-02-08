import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function DrawerMenu(props) {
  const exit = () => {
    localStorage.clear();
  };

  const selectedUser = localStorage.getItem("selectedUser"); //busca usuário selecionado

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          color: "rgba(15,19,17,1)",
          backgroundColor: "rgba(189, 231, 247, 1)",
          width: 160,
        },
      }}
      className="drawer"
      anchor="right"
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <ListItem id="list_align">
        <Link className="link" to="/users">
          Usuários
        </Link>
      </ListItem>
      <ListItem id="list_align">
        <Link className="link" to={`/timeline/${selectedUser}`}>
          Timeline
        </Link>
      </ListItem>
      <ListItem id="list_align">
        <Link className="link" to="/profile">
          Perfil
        </Link>
      </ListItem>
      <ListItem id="list_align">
        <Link className="link" onClick={exit} to="/">
          Sair
        </Link>
      </ListItem>
    </SwipeableDrawer>
  );
}
