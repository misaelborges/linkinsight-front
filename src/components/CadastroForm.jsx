import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foto_robo from "../assets/robo-digita-em-chat-bot-suporte-tecnico.png";

const CadastroForm = ({ cadastrar }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCPF] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade_nome, setCidade] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [genero, setGenero] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      window.alert("As senhas não coincidem");
      return;
    }

    if (!genero) {
      window.alert("Gênero não selecionado");
      return;
    }

    const isValidCPF = (cpf) => {
      // Expressão regular para validar CPF (somente formato, não a validade matemática)
      const regex = /^\d{11}$/;
      return regex.test(cpf);
    };
    
    // Use essa função antes de chamar `cadastrar` no handleSubmit
    if (!isValidCPF(cpf)) {
      window.alert("CPF inválido");
      return;
    }

    cadastrar(
      nome,
      sobrenome,
      email,
      celular,
      cpf,
      logradouro,
      cidade_nome,
      senha,
      genero
    );

    setNome("");
    setSobrenome("");
    setEmail("");
    setCelular("");
    setCPF("");
    setLogradouro("");
    setCidade("");
    setSenha("");
    setConfirmSenha("");
    setGenero("");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">

      <div className="form-image">
        <img src={foto_robo} alt="Foto robo digitando em um computador" />
      </div>

      <div className="form">
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="form-header">
            <div className="title">
              <h1>Cadastre-se</h1>
            </div>
            <div className="login-button">
              <button onClick={handleLoginClick}>Entrar</button>
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="firstname">Primeiro Nome</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Digite seu primeiro nome"
                required
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
            </div>

            <div className="input-box">
              <label htmlFor="lastname">Sobrenome</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Digite seu sobrenome"
                required
                onChange={(e) => setSobrenome(e.target.value)}
                value={sobrenome}
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="input-box">
              <label htmlFor="number">Celular</label>
              <input
                id="number"
                type="tel"
                name="number"
                placeholder="(xx) xxxx-xxxx"
                required
                onChange={(e) => setCelular(e.target.value)}
                value={celular}
              />
            </div>

            <div className="input-box">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                placeholder="xxxxxxxxxxx"
                required
                onChange={(e) => setCPF(e.target.value)}
                value={cpf}
              />
            </div>

            <div className="input-box">
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Nome da cidade"
                required
                onChange={(e) => setCidade(e.target.value)}
                value={cidade_nome}
              />
            </div>

            <div className="input-box">
              <label htmlFor="adress">Endereço</label>
              <input
                id="adress"
                type="text"
                name="adress"
                placeholder="Nome da rua"
                required
                onChange={(e) => setLogradouro(e.target.value)}
                value={logradouro}
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                required
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
            </div>

            <div className="input-box">
              <label htmlFor="confirmPassword">Confirme sua Senha</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Digite sua senha novamente"
                required
                onChange={(e) => setConfirmSenha(e.target.value)}
                value={confirmSenha}
              />
            </div>
          </div>

          <div className="gender-inputs">
            <div className="gender-title">
              <h6>Gênero</h6>
            </div>

            <div className="gender-group">
              <div className="gender-input">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="FEMININO"
                  required
                  onChange={(e) => setGenero(e.target.value)}
                  checked={genero === "FEMININO"}
                />
                <label htmlFor="female">Feminino</label>
              </div>

              <div className="gender-input">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="MASCULINO"
                  required
                  onChange={(e) => setGenero(e.target.value)}
                  checked={genero === "MASCULINO"}
                />
                <label htmlFor="male">Masculino</label>
              </div>

              <div className="gender-input">
                <input
                  id="others"
                  type="radio"
                  name="gender"
                  value="OUTROS"
                  required
                  onChange={(e) => setGenero(e.target.value)}
                  checked={genero === "OUTROS"}
                />
                <label htmlFor="others">Outros</label>
              </div>

              <div className="gender-input">
                <input
                  id="none"
                  type="radio"
                  name="gender"
                  value="NAO_DECLARADO"
                  required
                  onChange={(e) => setGenero(e.target.value)}
                  checked={genero === "NAO_DECLARADO"}
                />
                <label htmlFor="none">Prefiro não dizer</label>
              </div>
            </div>
          </div>

          <div className="continue-button">
            <button type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
