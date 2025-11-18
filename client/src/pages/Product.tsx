import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProducts } from '../api'

export default function Product(){
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const nav = useNavigate()
  useEffect(()=>{ fetchProducts().then(list => setProduct(list.find(x=>x.id===id))) },[id])
  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    nav('/cart')
  }
  if(!product) return <div>Loading...</div>
  return (
    <div className="card product-row">
      <img src={product.image} style={{width:320}} alt={product.title}/>
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>
        <button className="btn" onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  )
}
