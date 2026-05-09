import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { getUser } from "../helpers/auth";
import "./appShell.css";

function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
    { text: "Home", icon: <HomeRoundedIcon />, to: "/home" },
    { text: "Livros", icon: <MenuBookTwoToneIcon />, to: "/listarLivro" },
    { text: "Autores", icon: <PersonOutlineTwoToneIcon />, to: "/autores" },
    { text: "Editoras", icon: <ModeEditOutlineTwoToneIcon />, to: "/editoras" },
  ];

  const secondaryItems = [
    { text: "Configuracoes", icon: <SettingsIcon />, to: "/configuracoes" },
    { text: "Sair", icon: <LogoutTwoToneIcon />, action: handleLogout },
  ];

  const drawerList = (
    <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {secondaryItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.to ? Link : "button"}
              to={item.to}
              onClick={item.action}
              selected={item.to ? location.pathname === item.to : false}
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

      <div className="app-shell-page">
        <div className="app-shell-topbar-wrap">
          <div className="app-shell-topbar">
            <IconButton
              id="menu"
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="app-shell-topbar-button"
            >
              <MenuIcon />
            </IconButton>

            <div className="app-shell-topbar-user">
              <div className="app-shell-user-copy">
                <span className="app-shell-user-role">
                  {isAdmin ? "Administrador" : "Usuario comum"}
                </span>
                <strong>{user?.user || "Usuario"}</strong>
              </div>

              <Link to="/perfil" className="app-shell-profile-link">
                <AccountCircleOutlinedIcon />
              </Link>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
}

export default AppShell;
