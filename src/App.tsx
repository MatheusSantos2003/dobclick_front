
import Home from './pages/Home/Home'
import './App.css';
import Layout from './components/layout/Layout/Layout';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import EstoquePage from './pages/Produtos/Estoque';
import Providers from './Providers';
import Graficos from './pages/graficos/Graficos';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
  <>
    <Providers>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/estoque' element={<EstoquePage />} />
            <Route path='/graficos' element={<Graficos />} />
            <Route path='*' element={<Home />} />
          </Routes> 
        </Layout>
      </HashRouter>
    </Providers>
  </>
)

export default App
