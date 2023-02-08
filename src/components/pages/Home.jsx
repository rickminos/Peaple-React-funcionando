import React from "react";
import peapleicon from "../../img/peaple.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

export default function Home(props) {
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/signup");
  };

  const enter = () => {
    navigate(`/timeline/${localStorage.getItem("currentUser")}`);
  };

  const [login, setLogin] = React.useState(""); //busca login no DOM
  const [pwd, setPwd] = React.useState(""); //busca senha no DOM
  const log = { email: login, password: pwd }; //cria constante que será passada a API

  const handleLoginClick = () => {
    fetch("http://18.228.156.65:8080/user/login/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(log), //passa a contante a API
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Login autorizado") {
          localStorage.setItem("token", result.token);
          localStorage.setItem("currentUser", result.id); //id usuário que fez o login, todas as alterações ocorrerão nesse usuário
          localStorage.setItem("selectedUser", result.id); //id usuário que está sendo mostrado

          if (localStorage.getItem("currentUser")) {
            enter();
          }
        } else {
          const element = <p className="fail">Usuário ou senha incorretos</p>;
          ReactDOM.render(element, document.getElementById("message"));
        }
      });
  };

  return (
    <div>
      <div>
        <img id="logo" src={peapleicon} alt="Logo" />
      </div>
      <div id="message"></div>
      <div className="art">
        <h1 id="title">Bem vindo!</h1>
        <div className="user-pwd-container">
          <label for="login">
            <BsFillPersonFill className="i" />
          </label>
          <InputGroup>
            <Form.Control
              placeholder="usuário"
              aria-label="login"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />
          </InputGroup>
        </div>
        <div className="user-pwd-container">
          <label for="login">
            <BsFillLockFill className="i" />
          </label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="senha"
              aria-label="password"
              value={pwd}
              onChange={(event) => setPwd(event.target.value)}
            />
          </InputGroup>
        </div>
        <div id="btn-container">
          <Button onClick={handleLoginClick} className="button buttonMR">
            Entrar
          </Button>{" "}
          <Button onClick={signUp} className="button buttonML">
            Cadastre-se
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
