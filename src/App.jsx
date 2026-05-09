import Login from './pages/login/Index'
import Cadastro from './pages/cadastro/Index'
import Home from './pages/home/Index'
import NotFound from './pages/notFound/Index'
import Admin from './pages/admin/Index'
import ListarLivro from './pages/listarLivro/Index'
import CadastrarLivro from './pages/cadastrarLivro/Index'
import Autores from './pages/autores/Index'
import Editoras from './pages/editoras/Index'
import CadastrarAutor from './pages/cadastrarAutor/Index'
import CadastrarEditora from './pages/cadastrarEditora/Index'
import Configuracoes from './pages/configuracoes/Index'
import RedefinirSenha from './pages/redefinirSenha/Index'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import ProtectedRouter from './helpers/protectedRouter'
import Perfil from './pages/perfil/Index'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path='/redefinir-senha' element={<RedefinirSenha/>}/>
      <Route path='*' element={<NotFound/>}/>

      <Route path='/perfil' element={
        <ProtectedRouter>
          <Perfil/>
          </ProtectedRouter>}/>
      
      <Route path='/home' element={
        <ProtectedRouter>
          <Home/>
          </ProtectedRouter>}/>

      <Route path='/admin' element={
        <ProtectedRouter>
          <Admin/>
          </ProtectedRouter>}/>


        <Route path='/cadastrarLivro' element={
        <ProtectedRouter>
          <CadastrarLivro/>
          </ProtectedRouter>}/>

      
      <Route path='/listarLivro' element={
        <ProtectedRouter>
          <ListarLivro/>
          </ProtectedRouter>}/>

      <Route path='/autores' element={
        <ProtectedRouter>
          <Autores/>
          </ProtectedRouter>}/>

      <Route path='/editoras' element={
        <ProtectedRouter>
          <Editoras/>
          </ProtectedRouter>}/>

      <Route path='/cadastrarAutor' element={
        <ProtectedRouter>
          <CadastrarAutor/>
          </ProtectedRouter>}/>

      <Route path='/cadastrarEditora' element={
        <ProtectedRouter>
          <CadastrarEditora/>
          </ProtectedRouter>}/>

      <Route path='/configuracoes' element={
        <ProtectedRouter>
          <Configuracoes/>
          </ProtectedRouter>}/>

      
    </Routes>
      
    </BrowserRouter>
    
  )
}








export default App
