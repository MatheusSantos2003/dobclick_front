
import Home from './pages/Home/Home'
import './App.css';
import Layout from './components/layout/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EstoquePage from './pages/Produtos/Estoque';
import Providers from './Providers';
import Graficos from './pages/graficos/Graficos';


const App = () => (
  <>
    <Providers>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/estoque' element={<EstoquePage />} />
            <Route path='/graficos' element={<Graficos />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Providers>
  </>
)

export default App
