import { useState } from "react";
import { Link } from "react-router-dom";
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
import logo from "../../assets/logoLivraria.png";
import "./home.css";

function Index() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: "Livros", icon: <MenuBookTwoToneIcon /> },
    { text: "Editoras", icon: <ModeEditOutlineTwoToneIcon /> },
    { text: "Autores", icon: <PersonOutlineTwoToneIcon /> },
  ];

  const menuItemsSecondary = [
    { text: "Configuracoes", icon: <SettingsIcon /> },
    { text: "Sair", icon:<LogoutTwoToneIcon/>},
  ];

  const drawerList = (
    <Box sx={{ width: 260 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
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
            <ListItemButton>
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

            <Link to="/perfil" className="home-profile-link">
              <AccountCircleOutlinedIcon />
            </Link>
          </div>
        </div>

        <main className="home-main">
          <section className="home-hero">
            <img src={logo} alt="Livraria Cultura" className="home-logo" />
            <p className="home-kicker">Biblioteca online</p>
            <h1>Sejam Bem-Vindos(as)</h1>
            <p className="home-copy">
              Consulte titulos, editoras e autores em um ambiente simples e
              direto.
            </p>
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
