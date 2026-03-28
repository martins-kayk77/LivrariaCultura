import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import api from "../../services/api.js";
import { getUser } from "../../helpers/auth.js";
import "./perfil.css";

function Index() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    typeuser: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const token = sessionStorage.getItem("tokenJwt");
      const loggedUser = getUser();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data?.users) {
          setUserData({
            name: data.users.name ?? "",
            email: data.users.email ?? "",
            typeuser: data.users.typeuser ?? "",
          });
        }
      } catch (err) {
        setUserData({
          name: loggedUser?.user ?? "",
          email: loggedUser?.email ?? "",
          typeuser: loggedUser?.typeuser ?? "",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const userTypeLabel =
    userData.typeuser === "admin"
      ? "Administrador"
      : userData.typeuser === "comum"
        ? "Comum"
        : "Nao informado";

  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/home" className="profile-back">
          <KeyboardBackspaceRoundedIcon />
          <span>Voltar</span>
        </Link>
      </header>

      <main className="profile-main">
        <section className="profile-card">
          <div className="profile-hero">
            <div className="profile-avatar">
              <AccountCircleOutlinedIcon />
            </div>

            <div className="profile-intro">
              <p className="profile-eyebrow">Area do usuario</p>
              <h1>Meu Perfil</h1>
              <p className="profile-subtitle">
                Visualize seus dados e acompanhe as informacoes da sua conta.
              </p>
            </div>
          </div>

          <div className="profile-content">
            <aside className="profile-summary">
              <div className="summary-item">
                <BadgeOutlinedIcon />
                <div>
                  <span>Nome</span>
                  <strong>{isLoading ? "Carregando..." : userData.name || "Nao informado"}</strong>
                </div>
              </div>

              <div className="summary-item">
                <EmailOutlinedIcon />
                <div>
                  <span>Email</span>
                  <strong>{isLoading ? "Carregando..." : userData.email || "Nao informado"}</strong>
                </div>
              </div>

              <div className="summary-item">
                <ShieldOutlinedIcon />
                <div>
                  <span>Perfil de acesso</span>
                  <strong>{isLoading ? "Carregando..." : userTypeLabel}</strong>
                </div>
              </div>
            </aside>

            <section className="profile-panel">
              <div className="profile-panel-header">
                <h2>Informacoes da conta</h2>
                <p>Esses campos mostram os dados atuais do usuario logado.</p>
              </div>

              <div className="profile-grid">
                <label className="profile-field">
                  <span>Nome</span>
                  <input type="text" value={userData.name} readOnly />
                </label>

                <label className="profile-field">
                  <span>Email</span>
                  <input type="email" value={userData.email} readOnly />
                </label>

                <label className="profile-field profile-field-full">
                  <span>Tipo de usuario</span>
                  <input type="text" value={userTypeLabel} readOnly />
                </label>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Index;
