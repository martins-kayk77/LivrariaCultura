import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./autores.css";

function formatDate(dateString) {
  if (!dateString) return "Nao informado";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("pt-BR");
}

function Index() {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  useEffect(() => {
    async function loadAuthors() {
      try {
        const token = sessionStorage.getItem("tokenJwt");

        const { data } = await api.get("/author", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthors(data?.response ?? []);
      } catch (err) {
        setError(
          err?.response?.status === 401
            ? "Sua sessao expirou. Entre novamente para continuar."
            : "Nao foi possivel carregar os autores."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthors();
  }, []);

  const filteredAuthors = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return authors;

    return authors.filter((author) =>
      author?.nome_autor?.toLowerCase().includes(term)
    );
  }, [authors, search]);

  return (
    <AppShell>
      <div className="autores-page">
        <div className="autores-shell">
          <section className="autores-hero">
          <div>
            <p className="autores-kicker">Consulta</p>
            <h1>Autores cadastrados</h1>
            <p className="autores-copy">
              Navegue pelos autores presentes no acervo e acompanhe os dados
              principais de cada registro.
            </p>
          </div>

          {isAdmin && (
            <Link to="/cadastrarAutor" className="autores-create">
              <AddRoundedIcon />
              <span>Cadastrar autor</span>
            </Link>
          )}
        </section>

        <section className="autores-toolbar">
          <label className="autores-search">
            <SearchRoundedIcon />
            <input
              type="text"
              placeholder="Buscar por nome do autor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <div className="autores-summary">
            <strong>{filteredAuthors.length}</strong>
            <span>{filteredAuthors.length === 1 ? "autor" : "autores"}</span>
          </div>
        </section>

          {error && <div className="autores-feedback">{error}</div>}

          {isLoading ? (
            <div className="autores-empty">Carregando autores...</div>
          ) : filteredAuthors.length === 0 ? (
            <div className="autores-empty">Nenhum autor encontrado.</div>
          ) : (
            <section className="autores-grid">
              {filteredAuthors.map((author) => (
                <article key={author.codigo_autor} className="autores-card">
                <div className="autores-card-top">
                  <div className="autores-icon">
                    <PersonOutlineRoundedIcon />
                  </div>
                  <span className="autores-id">Autor #{author.codigo_autor}</span>
                </div>

                <h2>{author.nome_autor}</h2>

                <div className="autores-meta">
                  <div>
                    <CalendarMonthRoundedIcon />
                    <span>Nascimento: {formatDate(author.nasc_autor)}</span>
                  </div>
                  <div>
                    <PublicRoundedIcon />
                    <span>{author.nascionalidade}</span>
                  </div>
                </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default Index;
