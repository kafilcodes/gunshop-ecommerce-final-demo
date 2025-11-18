import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <Link to="/"><h1 className="brand">BuyGun</h1></Link>
          <nav className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
