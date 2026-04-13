import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import logo from "../../assets/logoLivraria.png";
import { getUser } from "../../helpers/auth";
import "./home.css";

function Index() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tokenJwt");
    navigate("/");
  };

  const menuItems = [
    { text: "Livros", icon: <MenuBookTwoToneIcon />, to: "/listarLivro" },
    { text: "Editoras", icon: <ModeEditOutlineTwoToneIcon />, to: "/home" },
    { text: "Autores", icon: <PersonOutlineTwoToneIcon />, to: "/home" },
  ];

  const menuItemsSecondary = [
    { text: "Configuracoes", icon: <SettingsIcon />, to: "/perfil" },
    { text: "Sair", icon: <LogoutTwoToneIcon />, action: handleLogout },
  ];

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
      to: "/home",
    },
    {
      title: "Editoras",
      description: "Acompanhe as editoras registradas e os dados principais.",
      icon: <BusinessOutlinedIcon />,
      to: "/home",
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
      title: "Perfil do usuario",
      description: "Revise os dados da conta logada.",
      icon: <AccountCircleOutlinedIcon />,
      to: "/perfil",
    },
  ];

  const drawerList = (
    <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {menuItemsSecondary.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.to ? Link : "button"}
              to={item.to}
              onClick={item.action}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      <div className="home-page">
        <div className="home-topbar-wrap">
          <div className="home-topbar">
            <IconButton
              id="menu"
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="home-topbar-button"
            >
              <MenuIcon />
            </IconButton>

            <div className="home-topbar-user">
              <div className="home-user-copy">
                <span className="home-user-role">
                  {isAdmin ? "Administrador" : "Usuario comum"}
                </span>
                <strong>{user?.user || "Usuario"}</strong>
              </div>

              <Link to="/perfil" className="home-profile-link">
                <AccountCircleOutlinedIcon />
              </Link>
            </div>
          </div>
        </div>

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
                .filter((action) => isAdmin || action.to === "/perfil")
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
    </>
  );
}

export default Index;
