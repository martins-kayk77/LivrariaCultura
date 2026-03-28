import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import logo from "../../assets/logoLivraria.png";
import "./cadastro.css";

function Index() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeuser, setTypeuser] = useState("");
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  async function handleCadastro(e) {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const payload = { name, email, password, typeuser };

      const { data } = await api.post("/user", payload);

      setFeedback({
        type: "success",
        message: data.response,
      });

      setTimeout(() => {
        navigate("/");
      }, 700);
      return;
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel concluir o cadastro.",
      });
    }
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-shell">
        <section className="cadastro-brand">
          <img src={logo} alt="Livraria Cultura" className="cadastro-logo" />
          <p className="cadastro-kicker">Criacao de conta</p>
          <h1>Entre para a livraria</h1>
          <p className="cadastro-copy">
            Preencha seus dados para acessar o sistema e navegar pelo catalogo.
          </p>
        </section>

        <section className="cadastro-card">
          <div className="cadastro-card-header">
            <h2>Cadastro</h2>
            <p>Leva menos de um minuto para configurar seu acesso.</p>
          </div>

          {feedback.message && (
            <div className={`cadastro-feedback cadastro-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleCadastro} className="cadastro-form">
            <label className="cadastro-field">
              <span>Nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="cadastro-input"
              />
            </label>

            <label className="cadastro-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="cadastro-input"
              />
            </label>

            <label className="cadastro-field">
              <span>Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crie uma senha"
                className="cadastro-input"
              />
            </label>

            <label className="cadastro-field">
              <span>Tipo de usuario</span>
              <select
                value={typeuser}
                onChange={(e) => setTypeuser(e.target.value)}
                required
                className="cadastro-input"
              >
                <option value="">Selecione</option>
                <option value="admin">Administrador</option>
                <option value="comum">Comum</option>
              </select>
            </label>

            <button type="submit" className="cadastro-button">
              Cadastrar
            </button>
          </form>

          <p className="cadastro-login-link">
            Ja tem conta? <Link to="/">Voltar para o login</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Index;
