import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import "./redefinirSenha.css";

function Index() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!token) {
      setFeedback({ type: "error", message: "Link invalido ou incompleto." });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: "error", message: "As senhas precisam ser iguais." });
      return;
    }

    try {
      const { data } = await api.put("/login/reset/confirm", { token, password });

      setFeedback({
        type: "success",
        message: data?.response || "Senha redefinida com sucesso.",
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel redefinir a senha.",
      });
    }
  }

  return (
    <div className="reset-page">
      <div className="reset-shell">
        <section className="reset-card">
          <div className="reset-header">
            <p className="reset-kicker">Recuperacao</p>
            <h1>Defina sua nova senha</h1>
            <p>
              Escolha uma nova senha para a sua conta. Depois disso, voce volta
              a entrar normalmente pelo login.
            </p>
          </div>

          {feedback.message && (
            <div className={`reset-feedback reset-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="reset-form">
            <label className="reset-field">
              <span>Nova senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a nova senha"
              />
            </label>

            <label className="reset-field">
              <span>Confirmar senha</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
              />
            </label>

            <button type="submit" className="reset-button">
              Salvar nova senha
            </button>
          </form>

          <p className="reset-back-link">
            Lembrou da senha? <Link to="/">Voltar para o login</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Index;
