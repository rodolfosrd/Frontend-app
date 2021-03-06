import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import '../estilos/Login.css'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext) 
  const navigate = useNavigate();
  
  const login = () => {
    const data = { username: username, password: password };


    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({username : response.data.username, id : response.data.id, status : true})
        navigate("/home");
      }
    });
  };
  return (
    <div class = "loginContainer"> 
      <label> USUARIO </label>
      <input
        type="Text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label> CONTRASEÑA </label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>INICIAR SESION</button>
    </div>
  );
}

export default Login;
