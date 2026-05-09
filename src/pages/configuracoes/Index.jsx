import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/auth";
import AppShell from "../../components/AppShell";
import "./configuracoes.css";

function Index() {
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.typeuser === "admin";

  const handleLogout = () => {
    sessionStorage.removeItem("tokenJwt");
    navigate("/");
  };

  return (
    <AppShell>
      <div className="configuracoes-page">
        <div className="configuracoes-shell">
          <section className="configuracoes-hero">
            <p className="configuracoes-kicker">Conta</p>
            <h1>Configuracoes</h1>
            <p className="configuracoes-copy">
              Gerencie sua sessao, visualize o tipo de acesso da conta e deixe
              o sistema mais organizado para o seu uso.
            </p>
          </section>

          <section className="configuracoes-grid">
            <article className="configuracoes-card">
              <div className="configuracoes-icon">
                <ManageAccountsRoundedIcon />
              </div>
              <h2>Conta atual</h2>
              <p>{user?.user || "Usuario"}</p>
              <span>{isAdmin ? "Administrador" : "Usuario comum"}</span>
            </article>

            <article className="configuracoes-card">
              <div className="configuracoes-icon">
                <SecurityRoundedIcon />
              </div>
              <h2>Seguranca</h2>
              <p>Sua conta esta protegida por login com token.</p>
              <span>Alteracao de senha pode entrar depois.</span>
            </article>

            <article className="configuracoes-card configuracoes-card-session">
              <div className="configuracoes-icon">
                <LogoutRoundedIcon />
              </div>
              <h2>Sessao</h2>
              <p>Se quiser encerrar o acesso neste navegador, voce pode sair aqui.</p>
              <button type="button" onClick={handleLogout} className="configuracoes-logout">
                Sair da conta
              </button>
            </article>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export default Index;
