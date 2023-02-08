import React from "react";
import peapleicon from "../../img/peaple.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BsEnvelope } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  const [email, setEmail] = React.useState(""); //busca dados no DOM
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVerify, setPasswordVerify] = React.useState(""); //verificação da senha DOM
  const signUp = {
    email: email,
    fname: fname,
    lname: lname,
    password: password,
  }; //constante que será enviada a API

  const handleSignUpClick = () => {
    fetch(`http://18.228.156.65:8080/user/`)
      .then((response) => response.json())
      .then((data) => {
        const user = data.filter((item) => item.email === email); //filtra usuários com e-mail igual ao digitado no DOM

        if (password !== passwordVerify) {
          //verifica se as 2 senhas digitadas são idênticas
          const element = (
            <p className="fail">As senhas digitadas devem ser iguais</p>
          );
          ReactDOM.render(element, document.getElementById("message"));
        } else {
          if (user.length === 0) {
            //verifica se já tem algum usuário com o mesmo e-mail digitado no DOM

            fetch("http://18.228.156.65:8080/user/", {
              method: "POST",
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body: JSON.stringify(signUp), //envia dados do novo usuário a API
            })
              .then((response) => response.json())
              .then((result) => {
                if (result.message === "User adicionado com sucesso!") {
                  const element = (
                    <p className="sucess">usuário criado com sucesso!</p>
                  );
                  ReactDOM.render(element, document.getElementById("message"));
                  setTimeout(function () {
                    navigate("/");
                  }, 5000); //redireciona para a página de login após 5 segundos
                } else {
                  const element = (
                    <p className="fail">
                      Verifique os dados digitados e tente novamente
                    </p>
                  );
                  ReactDOM.render(element, document.getElementById("message"));
                }
              });
          } else {
            const element = <p className="fail">Usuário já cadastrado</p>;
            ReactDOM.render(element, document.getElementById("message"));
          }
        }
      });
  };

  return (
    <div>
      <div>
        <img id="logo" src={peapleicon} alt="Logo" />
      </div>
      <div id="message"></div>
      <div class="art art-cadastro">
        <h1 id="title">Cadastre-se</h1>
        <div className="user-pwd-container">
          <label for="login">
            <BsEnvelope className="i" />
          </label>
          <InputGroup>
            <Form.Control
              placeholder="E-mail"
              aria-label="login"
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputGroup>
        </div>
        <div className="user-pwd-container">
          <label for="login">
            <BsPersonLinesFill className="i" />
          </label>
          <InputGroup>
            <Form.Control
              placeholder="Nome"
              aria-label="fname"
              onChange={(event) => setFname(event.target.value)}
            />
          </InputGroup>
        </div>
        <div className="user-pwd-container">
          <label for="login">
            <BsPersonLinesFill className="i" />
          </label>
          <InputGroup>
            <Form.Control
              placeholder="Sobrenome"
              aria-label="lname"
              onChange={(event) => setLname(event.target.value)}
            />
          </InputGroup>
        </div>
        <div className="user-pwd-container">
          <label for="login">
            <BsLock className="i" />
          </label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Senha"
              aria-label="senha"
              onChange={(event) => setPassword(event.target.value)}
            />
          </InputGroup>
        </div>
        <div className="user-pwd-container">
          <label for="password">
            <BsLockFill className="i" />
          </label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Confirmar senha"
              aria-label="confsenha"
              onChange={(event) => setPasswordVerify(event.target.value)}
            />
          </InputGroup>
        </div>
        <div id="btn-container">
          <Button onClick={handleSignUpClick} className="button buttonMR">
            Enviar
          </Button>{" "}
          <Button onClick={home} className="button buttonML">
            Já cadastrado
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
