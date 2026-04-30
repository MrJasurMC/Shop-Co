import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Home from './pages/Home/Home.jsx'
import Categories from './pages/Categories/Categories.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import NotFound from "./pages/NotFound/NotFound.jsx"
import Loading from './pages/Loading/Loading.jsx'

function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  if (loading) return <Loading onFinish={() => setLoading(false)} />
  
  return (
    <section className='max-w-[1440px]'>
      <Header setText={setText} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories text={text} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/loading" element={<Loading onFinish={() => console.log('Loading finished!')} />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App
