import { Link } from "react-router-dom";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import logo from "../../assets/logoLivraria.png";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./home.css";

function Index() {
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const primaryCards = [
    {
      title: "Livros",
      description: "Consulte o catalogo e acompanhe os titulos ja cadastrados.",
      icon: <AutoStoriesOutlinedIcon />,
      to: "/listarLivro",
    },
    {
      title: "Autores",
      description: "Veja os autores vinculados aos livros e organize o acervo.",
      icon: <Groups2OutlinedIcon />,
      to: "/autores",
    },
    {
      title: "Editoras",
      description: "Acompanhe as editoras registradas e os dados principais.",
      icon: <BusinessOutlinedIcon />,
      to: "/editoras",
    },
    {
      title: "Perfil",
      description: "Confira seus dados de acesso e informacoes da conta.",
      icon: <PersonOutlineOutlinedIcon />,
      to: "/perfil",
    },
  ];

  const quickActions = [
    {
      title: "Cadastrar livro",
      description: "Inclua novos titulos no sistema.",
      icon: <BookmarkAddedOutlinedIcon />,
      to: "/cadastrarLivro",
    },
    {
      title: "Cadastrar autor",
      description: "Registre novos autores do acervo.",
      icon: <Groups2OutlinedIcon />,
      to: "/cadastrarAutor",
    },
    {
      title: "Cadastrar editora",
      description: "Adicione editoras para o catalogo.",
      icon: <BusinessOutlinedIcon />,
      to: "/cadastrarEditora",
    },
    {
      title: "Meu perfil",
      description: "Veja os dados da sua conta.",
      icon: <PersonOutlineOutlinedIcon />,
      to: "/perfil",
    },
    {
      title: "Configuracoes",
      description: "Acesse ajustes e opcoes da conta.",
      icon: <SettingsRoundedIcon />,
      to: "/configuracoes",
    },
  ];

  return (
    <AppShell>
      <div className="home-page">
        <main className="home-main">
          <section className="home-welcome">
            <div className="home-welcome-copy">
              <p className="home-kicker">Biblioteca online</p>
              <h1>Bem-vindo a Livraria Cultura</h1>
              <p className="home-copy">
                Acesse o catalogo, consulte autores e editoras e organize as
                informacoes do sistema com mais facilidade.
              </p>
              {isAdmin && (
                <p className="home-admin-note">
                  Voce possui acesso administrativo para cadastrar e atualizar
                  dados do acervo.
                </p>
              )}
            </div>

            <div className="home-logo-panel">
              <img src={logo} alt="Livraria Cultura" className="home-logo" />
            </div>
          </section>

          <section className="home-section">
            <div className="home-section-header">
              <h2>Atalhos principais</h2>
              <p>Entre rapidamente nas areas mais usadas do sistema.</p>
            </div>

            <div className="home-grid">
              {primaryCards.map((card) => (
                <Link key={card.title} to={card.to} className="home-card">
                  <div className="home-card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="home-section">
            <div className="home-section-header">
              <h2>{isAdmin ? "Acoes rapidas" : "Sua conta"}</h2>
              <p>
                {isAdmin
                  ? "Use estes atalhos para continuar o trabalho sem perder tempo."
                  : "Acesse informacoes da sua conta e acompanhe o sistema."}
              </p>
            </div>

            <div className="home-actions-grid">
              {quickActions
                .filter((action) =>
                  isAdmin
                    ? true
                    : action.to === "/perfil" || action.to === "/configuracoes"
                )
                .map((action) => (
                  <Link key={action.title} to={action.to} className="home-action-card">
                    <div className="home-action-icon">{action.icon}</div>
                    <div>
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </main>

        <footer className="home-footer">
          <span>Contato: kaike@gmail.com</span>
        </footer>
      </div>
    </AppShell>
  );
}

export default Index;
