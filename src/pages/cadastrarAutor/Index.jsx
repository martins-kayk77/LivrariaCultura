import { useState } from "react";
import { Link } from "react-router-dom";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./cadastrarAutor.css";

function Index() {
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const [formData, setFormData] = useState({
    nome_autor: "",
    nasc_autor: "",
    nascionalidade: "",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const token = sessionStorage.getItem("tokenJwt");

      const { data } = await api.post("/author", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedback({
        type: "success",
        message: data?.response || "Autor cadastrado com sucesso.",
      });

      setFormData({
        nome_autor: "",
        nasc_autor: "",
        nascionalidade: "",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err?.response?.status === 401
            ? "Sua sessao expirou. Faca login novamente para cadastrar autores."
            : err?.response?.data?.response || "Nao foi possivel cadastrar o autor.",
      });
    }
  };

  if (!isAdmin) {
    return (
      <AppShell>
        <div className="cadastrar-autor-page">
          <div className="cadastrar-autor-shell">
            <div className="cadastrar-autor-restricted">
              <h1>Acesso restrito</h1>
              <p>Somente administradores podem cadastrar autores no sistema.</p>
              <Link to="/home" className="cadastrar-autor-back">
                <ArrowBackRoundedIcon />
                <span>Voltar para a home</span>
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="cadastrar-autor-page">
        <div className="cadastrar-autor-shell">
          <section className="cadastrar-autor-hero">
          <div>
            <p className="cadastrar-autor-kicker">Administracao</p>
            <h1>Cadastrar autor</h1>
            <p className="cadastrar-autor-copy">
              Registre novos autores para manter o acervo organizado e pronto
              para futuras associacoes com livros.
            </p>
          </div>

          <div className="cadastrar-autor-badge">
            <PersonAddAlt1RoundedIcon />
          </div>
        </section>

          <section className="cadastrar-autor-card">
          <div className="cadastrar-autor-card-header">
            <h2>Dados do autor</h2>
            <p>Preencha as informacoes principais para salvar um novo registro.</p>
          </div>

          {feedback.message && (
            <div className={`cadastrar-autor-feedback cadastrar-autor-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="cadastrar-autor-form">
            <div className="cadastrar-autor-grid">
              <label className="cadastrar-autor-field cadastrar-autor-field-full">
                <span>Nome do autor</span>
                <input
                  type="text"
                  name="nome_autor"
                  value={formData.nome_autor}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                />
              </label>

              <label className="cadastrar-autor-field">
                <span>Data de nascimento</span>
                <input
                  type="date"
                  name="nasc_autor"
                  value={formData.nasc_autor}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </label>

              <label className="cadastrar-autor-field">
                <span>Nacionalidade</span>
                <input
                  type="text"
                  name="nascionalidade"
                  value={formData.nascionalidade}
                  onChange={handleChange}
                  placeholder="Ex: Brasileira"
                />
              </label>
            </div>

            <div className="cadastrar-autor-actions">
              <Link to="/autores" className="cadastrar-autor-secondary">
                Ver autores
              </Link>
              <button type="submit" className="cadastrar-autor-primary">
                Salvar autor
              </button>
            </div>
          </form>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export default Index;
