import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import logo from "../../assets/logoLivraria.png";
import "./login.css";

function Index() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const payload = { email, password };
      const { data } = await api.post("/login", payload);

      setFeedback({
        type: "success",
        message: data.response,
      });
      sessionStorage.setItem("tokenJwt", data.token);

      setTimeout(() => {
        navigate("/home");
      }, 700);
      return;
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel fazer login.",
      });
    }
  }

  async function handleResetPassword() {
    setFeedback({ type: "", message: "" });

    if (!email || !email.includes("@")) {
      setFeedback({
        type: "error",
        message: "Informe um email valido para recuperar a senha.",
      });
      return;
    }

    try {
      const { data } = await api.put("/login/reset", { email });

      setFeedback({
        type: "success",
        message: data?.response || "Link de redefinicao enviado para o email cadastrado.",
      });
      setShowReset(false);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel recuperar a senha.",
      });
    }
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brand">
          <img src={logo} alt="Livraria Cultura" className="login-logo" />
          <p className="login-kicker">Acesso ao sistema</p>
          <h1>Bem-vindo de volta</h1>
          <p className="login-copy">
            Entre com seu email e sua senha para acessar a area interna da
            livraria.
          </p>

          <div className="login-contact">
            <strong>Contato</strong>
            <span>Whatsapp: (11) 98765-4321</span>
            <span>Email: Luisprofessor@gmail.com</span>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-header">
            <h2>Login</h2>
            <p>Use os dados da sua conta para continuar.</p>
          </div>

          {feedback.message && (
            <div className={`login-feedback login-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="login-input"
              />
            </label>

            <label className="login-field">
              <span>Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="login-input"
              />
            </label>

            <button
              type="button"
              className="login-forgot-button"
              onClick={() => setShowReset((current) => !current)}
            >
              Esqueceu a senha?
            </button>

            {showReset && (
              <div className="login-reset-box">
                <p>
                  Informe seu email cadastrado para receber um link de redefinicao.
                </p>
                <button
                  type="button"
                  className="login-reset-action"
                  onClick={handleResetPassword}
                >
                  Enviar link
                </button>
              </div>
            )}

            <button type="submit" className="login-button">
              Acessar
            </button>
          </form>

          <p className="login-register-link">
            Ainda nao tem conta? <Link to="/Cadastro">Cadastre-se</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Index;
