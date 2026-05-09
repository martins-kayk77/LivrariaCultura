import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./cadastrarLivro.css";

function Index() {
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const [formData, setFormData] = useState({
    nome_livro: "",
    publicacao: "",
    pages: "",
    price: "",
    codigo_categoria: "",
    codigo_editora: "",
  });
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [categoryResponse, publisherResponse] = await Promise.all([
          api.get("/category"),
          api.get("/publishers"),
        ]);

        setCategories(categoryResponse.data?.response ?? []);
        setPublishers(publisherResponse.data?.response ?? []);
      } catch (err) {
        setFeedback({
          type: "error",
          message: "Nao foi possivel carregar categorias e editoras.",
        });
      } finally {
        setIsLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "price" ? value.replace(/[^\d,.]/g, "") : value;

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const payload = {
        ...formData,
        pages: Number(formData.pages),
        price: formData.price.replace(",", "."),
        codigo_categoria: Number(formData.codigo_categoria),
        codigo_editora: Number(formData.codigo_editora),
      };

      const { data } = await api.post("/livro", payload);

      setFeedback({
        type: "success",
        message: data?.response || "Livro cadastrado com sucesso.",
      });

      setFormData({
        nome_livro: "",
        publicacao: "",
        pages: "",
        price: "",
        codigo_categoria: "",
        codigo_editora: "",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.response || "Nao foi possivel cadastrar o livro.",
      });
    }
  };

  if (!isAdmin) {
    return (
      <AppShell>
        <div className="cadastrar-livro-page">
          <div className="cadastrar-livro-shell">
            <div className="cadastrar-livro-restricted">
              <h1>Acesso restrito</h1>
              <p>Somente administradores podem cadastrar livros no sistema.</p>
              <Link to="/home" className="cadastrar-livro-back">
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
      <div className="cadastrar-livro-page">
        <div className="cadastrar-livro-shell">
          <section className="cadastrar-livro-hero">
          <div>
            <p className="cadastrar-livro-kicker">Administracao</p>
            <h1>Cadastrar livro</h1>
            <p className="cadastrar-livro-copy">
              Preencha os dados principais do titulo, selecione categoria e
              editora e salve o registro no catalogo.
            </p>
          </div>

          <div className="cadastrar-livro-badge">
            <LibraryAddOutlinedIcon />
          </div>
        </section>

          <section className="cadastrar-livro-card">
          <div className="cadastrar-livro-card-header">
            <h2>Dados do livro</h2>
            <p>Os campos abaixo sao enviados para a rota de cadastro do backend.</p>
          </div>

          {feedback.message && (
            <div className={`cadastrar-livro-feedback cadastrar-livro-feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="cadastrar-livro-form">
            <div className="cadastrar-livro-grid">
              <label className="cadastrar-livro-field cadastrar-livro-field-full">
                <span>Nome do livro</span>
                <input
                  type="text"
                  name="nome_livro"
                  value={formData.nome_livro}
                  onChange={handleChange}
                  placeholder="Digite o titulo"
                />
              </label>

              <label className="cadastrar-livro-field">
                <span>Data de publicacao</span>
                <input
                  type="date"
                  name="publicacao"
                  value={formData.publicacao}
                  onChange={handleChange}
                />
              </label>

              <label className="cadastrar-livro-field">
                <span>Paginas</span>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="Ex: 320"
                />
              </label>

              <label className="cadastrar-livro-field">
                <span>Preco</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  inputMode="decimal"
                  placeholder="Ex: 59,90"
                />
              </label>

              <label className="cadastrar-livro-field">
                <span>Categoria</span>
                <select
                  name="codigo_categoria"
                  value={formData.codigo_categoria}
                  onChange={handleChange}
                  disabled={isLoadingOptions}
                >
                  <option value="">Selecione</option>
                  {categories.map((category) => (
                    <option
                      key={category.codigo_categoria}
                      value={category.codigo_categoria}
                    >
                      {category.nome_categoria}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cadastrar-livro-field cadastrar-livro-field-full">
                <span>Editora</span>
                <select
                  name="codigo_editora"
                  value={formData.codigo_editora}
                  onChange={handleChange}
                  disabled={isLoadingOptions}
                >
                  <option value="">Selecione</option>
                  {publishers.map((publisher) => (
                    <option
                      key={publisher.codigo_editora}
                      value={publisher.codigo_editora}
                    >
                      {publisher.nome_editora}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="cadastrar-livro-actions">
              <Link to="/listarLivro" className="cadastrar-livro-secondary">
                Ver catalogo
              </Link>
              <button type="submit" className="cadastrar-livro-primary">
                Salvar livro
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
