import React from "react";
import Default from "../templates/Default";
import Loading from "../atoms/Loading";
import UserList from "../molecules/UserList";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = React.useState([]); //recebe usuários da API
  const [loading, setLoading] = React.useState(true); //define se loading será mostrado

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    } else {
      fetch("http://18.228.156.65:8080/user/")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          navigate("/");
        });
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Default>
      <div className="users">
        <h1>Usuários</h1>
        <UserList users={users} />
      </div>
    </Default>
  );
}
