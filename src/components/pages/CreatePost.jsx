import React from "react";
import Button from "react-bootstrap/Button";
import Default from "../templates/Default";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";

export default function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true); //define se o loading aparece

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);

  const headers = new Headers(); //cria o header para autenticar na API
  headers.append("Content-Type", "application/json");
  headers.append("authorization", localStorage.getItem("token"));

  const [title, setTitle] = React.useState(""); //recebe titulo do DOM
  const [description, setDescription] = React.useState(""); //recebe descrição do DOM
  const post = { title: title, description: description }; //constante que será enviada a API

  const handlePostClick = () => {
    fetch(
      `http://18.228.156.65:8080/user/${localStorage.getItem("currentUser")}/posts`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(post), //envia constante para a API
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Post adicionado com sucesso!") {
          const element = <p className="sucess">Post criado com sucesso!</p>;
          ReactDOM.render(element, document.getElementById("message"));
          setTimeout(function () {
            navigate(`/timeline/${localStorage.getItem("currentUser")}`);
          }, 5000);
        } else {
          const element = <p className="fail">Tente novamente mais tarde</p>;
          ReactDOM.render(element, document.getElementById("message"));
        }
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <Default>
      <div id="message"></div>
      <div className="create-post">
        <h1>Criar</h1>
        <form className="create-post__form">
          <div className="create-post__form-name">
            <label for="name" className="label-name">
              Título
            </label>
            <input
              type="text"
              id="name"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="create-post__form-content">
            <label for="content" className="label-name">
              Conteúdo
            </label>
            <textarea
              name="content"
              id="content"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div id="btn-container">
            <Button onClick={handlePostClick} className="button buttonCenter">
              Criar post
            </Button>{" "}
          </div>
        </form>
      </div>
    </Default>
  );
}
