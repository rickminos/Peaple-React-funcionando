import React from "react";
import Default from "../templates/Default";
import PostList from "../molecules/PostList";
import Loading from "../atoms/Loading";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function TimeLine() {
  const selectedUser = localStorage.getItem("selectedUser"); //usuário selecionado para ser mostrado
  const navigate = useNavigate();
  const newPost = () => {
    navigate("/newpost");
  }; //navega para pagina de criação de post

  if (localStorage.getItem("token") === null) {
    navigate("/");
  }

  const [posts, setPosts] = React.useState([]); //recebe posts da API

  const [loading, setLoading] = React.useState(true); //define se loading será mostrado

  const headers = new Headers(); //cria header para autenticação
  headers.append("Content-Type", "application/json");
  headers.append("authorization", localStorage.getItem("token"));

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    } else {
      fetch(`http://18.228.156.65:8080/user/${selectedUser}/posts`, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, [selectedUser]);

  return loading ? (
    <Loading />
  ) : (
    <Default>
      <div className="user-blog">
        <div id="btn-container">
          <Button onClick={newPost} id="buttonlg" className="button btnpos">
            Nova postagem
          </Button>{" "}
        </div>
        <PostList posts={posts} />
      </div>
    </Default>
  );
}
