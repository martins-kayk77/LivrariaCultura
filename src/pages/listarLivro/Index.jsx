import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../../services/api";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./listarLivro.css";

function formatDate(dateString) {
  if (!dateString) return "Nao informado";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("pt-BR");
}

function formatPrice(price) {
  if (price === undefined || price === null || price === "") return "Nao informado";

  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Index() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  useEffect(() => {
    async function loadBooks() {
      try {
        const { data } = await api.get("/livro");
        setBooks(data?.response ?? []);
      } catch (err) {
        setError("Nao foi possivel carregar os livros.");
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return books;

    return books.filter((book) =>
      book?.nome_livro?.toLowerCase().includes(term)
    );
  }, [books, search]);

  return (
    <AppShell>
      <div className="listar-livro-page">
        <div className="listar-livro-shell">
          <section className="listar-livro-hero">
          <div>
            <p className="listar-livro-kicker">Catalogo</p>
            <h1>Livros cadastrados</h1>
            <p className="listar-livro-copy">
              Consulte o acervo atual do sistema e encontre titulos com mais
              rapidez.
            </p>
          </div>

          {isAdmin && (
            <Link to="/cadastrarLivro" className="listar-livro-create">
              <AddRoundedIcon />
              <span>Cadastrar livro</span>
            </Link>
          )}
        </section>

        <section className="listar-livro-toolbar">
          <label className="listar-livro-search">
            <SearchRoundedIcon />
            <input
              type="text"
              placeholder="Buscar por nome do livro"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <div className="listar-livro-summary">
            <strong>{filteredBooks.length}</strong>
            <span>{filteredBooks.length === 1 ? "resultado" : "resultados"}</span>
          </div>
        </section>

          {error && <div className="listar-livro-feedback">{error}</div>}

          {isLoading ? (
            <div className="listar-livro-empty">Carregando livros...</div>
          ) : filteredBooks.length === 0 ? (
            <div className="listar-livro-empty">
              Nenhum livro encontrado com esse filtro.
            </div>
          ) : (
            <section className="listar-livro-grid">
              {filteredBooks.map((book) => (
                <article key={book.id} className="listar-livro-card">
                <div className="listar-livro-card-top">
                  <div className="listar-livro-icon">
                    <MenuBookOutlinedIcon />
                  </div>
                  <span className="listar-livro-id">Livro #{book.id}</span>
                </div>

                <h2>{book.nome_livro}</h2>

                <div className="listar-livro-meta">
                  <div>
                    <AutoStoriesOutlinedIcon />
                    <span>{book.pages} paginas</span>
                  </div>
                  <div>
                    <AttachMoneyOutlinedIcon />
                    <span>{formatPrice(book.price)}</span>
                  </div>
                  <div>
                    <LocalLibraryOutlinedIcon />
                    <span>Publicado em {formatDate(book.publicacao)}</span>
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
