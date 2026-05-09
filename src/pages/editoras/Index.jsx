import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./editoras.css";

function Index() {
  const [publishers, setPublishers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  useEffect(() => {
    async function loadPublishers() {
      try {
        const { data } = await api.get("/publishers");
        setPublishers(data?.response ?? []);
      } catch (err) {
        setError("Nao foi possivel carregar as editoras.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPublishers();
  }, []);

  const filteredPublishers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return publishers;

    return publishers.filter((publisher) =>
      publisher?.nome_editora?.toLowerCase().includes(term)
    );
  }, [publishers, search]);

  return (
    <AppShell>
      <div className="editoras-page">
        <div className="editoras-shell">
          <section className="editoras-hero">
          <div>
            <p className="editoras-kicker">Consulta</p>
            <h1>Editoras cadastradas</h1>
            <p className="editoras-copy">
              Acompanhe os dados das editoras registradas no sistema e encontre os
              contatos principais com rapidez.
            </p>
          </div>

          {isAdmin && (
            <Link to="/cadastrarEditora" className="editoras-create">
              <AddRoundedIcon />
              <span>Cadastrar editora</span>
            </Link>
          )}
        </section>

        <section className="editoras-toolbar">
          <label className="editoras-search">
            <SearchRoundedIcon />
            <input
              type="text"
              placeholder="Buscar por nome da editora"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <div className="editoras-summary">
            <strong>{filteredPublishers.length}</strong>
            <span>{filteredPublishers.length === 1 ? "editora" : "editoras"}</span>
          </div>
        </section>

          {error && <div className="editoras-feedback">{error}</div>}

          {isLoading ? (
            <div className="editoras-empty">Carregando editoras...</div>
          ) : filteredPublishers.length === 0 ? (
            <div className="editoras-empty">Nenhuma editora encontrada.</div>
          ) : (
            <section className="editoras-grid">
              {filteredPublishers.map((publisher) => (
                <article key={publisher.codigo_editora} className="editoras-card">
                <div className="editoras-card-top">
                  <div className="editoras-icon">
                    <BusinessRoundedIcon />
                  </div>
                  <span className="editoras-id">
                    Editora #{publisher.codigo_editora}
                  </span>
                </div>

                <h2>{publisher.nome_editora}</h2>

                <div className="editoras-meta">
                  <div>
                    <BadgeRoundedIcon />
                    <span>CNPJ: {publisher.cnpj}</span>
                  </div>
                  <div>
                    <AlternateEmailRoundedIcon />
                    <span>{publisher.email}</span>
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
