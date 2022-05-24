
import Home from './pages/Home/Home'
import './App.css';
import Layout from './components/layout/Layout/Layout';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import EstoquePage from './pages/Produtos/Estoque';
import Providers from './Providers';
import Graficos from './pages/Vendas/Vendas';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';






const App = () => {

  return (
  <>
    <Providers>
      <HashRouter>
     
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/estoque' element={<EstoquePage />} />
            <Route path='/vendas' element={<Graficos />} />
            <Route path='*' element={<LoginPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/cadastro' element={<RegisterPage />} />
          </Routes>
      
      </HashRouter>
    </Providers>
  </>
  );

}



export default App
