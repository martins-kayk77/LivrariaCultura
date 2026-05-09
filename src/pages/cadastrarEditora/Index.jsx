import { useState } from "react";
import { Link } from "react-router-dom";
import DomainAddRoundedIcon from "@mui/icons-material/DomainAddRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./cadastrarEditora.css";

function Index() {
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const [formData, setFormData] = useState({
    nome_editora: "",
    cnpj: "",
    email: "",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const formatCnpj = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);

    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "cnpj" ? formatCnpj(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const { data } = await api.post("/publishers", formData);

      setFeedback({
        type: "success",
        message: data?.response || "Editora cadastrada com sucesso.",
      });

      setFormData({
        nome_editora: "",
        cnpj: "",
        email: "",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel cadastrar a editora.",
      });
    }
  };

  if (!isAdmin) {
    return (
      <AppShell>
        <div className="cadastrar-editora-page">
          <div className="cadastrar-editora-shell">
            <div className="cadastrar-editora-restricted">
              <h1>Acesso restrito</h1>
              <p>Somente administradores podem cadastrar editoras no sistema.</p>
              <Link to="/home" className="cadastrar-editora-back">
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
      <div className="cadastrar-editora-page">
        <div className="cadastrar-editora-shell">
          <section className="cadastrar-editora-hero">
          <div>
            <p className="cadastrar-editora-kicker">Administracao</p>
            <h1>Cadastrar editora</h1>
            <p className="cadastrar-editora-copy">
              Registre novas editoras para enriquecer o catalogo e manter os
              dados do acervo completos.
            </p>
          </div>

          <div className="cadastrar-editora-badge">
            <DomainAddRoundedIcon />
          </div>
        </section>

          <section className="cadastrar-editora-card">
          <div className="cadastrar-editora-card-header">
            <h2>Dados da editora</h2>
            <p>Preencha as informacoes principais para salvar um novo registro.</p>
          </div>

          {feedback.message && (
            <div className={`cadastrar-editora-feedback cadastrar-editora-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="cadastrar-editora-form">
            <div className="cadastrar-editora-grid">
              <label className="cadastrar-editora-field cadastrar-editora-field-full">
                <span>Nome da editora</span>
                <input
                  type="text"
                  name="nome_editora"
                  value={formData.nome_editora}
                  onChange={handleChange}
                  placeholder="Digite o nome da editora"
                />
              </label>

              <label className="cadastrar-editora-field">
                <span>CNPJ</span>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                />
              </label>

              <label className="cadastrar-editora-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@editora.com"
                />
              </label>
            </div>

            <div className="cadastrar-editora-actions">
              <Link to="/editoras" className="cadastrar-editora-secondary">
                Ver editoras
              </Link>
              <button type="submit" className="cadastrar-editora-primary">
                Salvar editora
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
