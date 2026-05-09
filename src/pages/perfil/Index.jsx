import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import api from "../../services/api.js";
import { getUser } from "../../helpers/auth.js";
import AppShell from "../../components/AppShell";
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
    <AppShell>
      <div className="profile-page">
        

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
              <div className="summary-item summary-item-permissions">
                <ShieldOutlinedIcon />
                <div>
                  <span>Permissoes</span>
                  <strong>
                    {userTypeLabel === "Administrador"
                      ? "Pode cadastrar, editar e organizar livros, autores e editoras do sistema."
                      : "Pode consultar livros, autores, editoras e acompanhar as informacoes da propria conta."}
                  </strong>
                </div>
              </div>
            </aside>

            <section className="profile-panel">
              <div className="profile-panel-header">
                <h2>Informacoes da conta</h2>
                <p>
                  Esses campos mostram os dados atuais do usuario logado.
                </p>
              </div>

              <div className="profile-grid">
                <label className="profile-field">
                  <span>Nome</span>
                  <input
                    type="text"
                    value={isLoading ? "Carregando..." : userData.name}
                    readOnly
                  />
                </label>

                <label className="profile-field profile-field-user-type">
                  <span>Tipo de usuario</span>
                  <input
                    type="text"
                    value={isLoading ? "Carregando..." : userTypeLabel}
                    readOnly
                  />
                </label>

                <label className="profile-field profile-field-full">
                  <span>Email</span>
                  <input
                    type="text"
                    value={isLoading ? "Carregando..." : userData.email}
                    readOnly
                  />
                </label>
              </div>
            </section>
          </div>
          </section>
        </main>
      </div>
    </AppShell>
  );
}

export default Index;
