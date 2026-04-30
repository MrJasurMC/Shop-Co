import './index.css'
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Home from './pages/Home/Home.jsx'
import Categories from './pages/Categories/Categories.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import NotFound from "./pages/NotFound/NotFound.jsx"

function App() {
  return (
    <section className='max-w-[1440px]'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App
