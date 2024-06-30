import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom"; // Importar Link e useNavigate do React Router
import connected_world_animate from "../assets/connected-world-animate.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }), // Envia email e senha ao servidor
      });

      if (response.ok) {
        const data = await response.json();
        // Armazenar o token em localStorage ou sessionStorage
        localStorage.setItem("token", data.token);
        window.alert(`Bem-vindo(a)!`);
        // Redirecionar para a página principal ou dashboard após login bem-sucedido
        navigate("/chatbot"); // Exemplo de redirecionamento, ajuste conforme necessário
      } else {
        window.alert("Erro ao fazer login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      window.alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>Faça login e entre no chatbot</h1>
        <img src={connected_world_animate} className="left-login-image" alt="Astronauta animação" />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <div className="textfield">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textfield">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
          <div>
            <p>
              Não tem um cadastro conosco ainda?! Não se preocupe!{" "}
              <Link to="/cadastro">Cadastre-se</Link> agora! 😍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
