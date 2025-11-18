import React, { useState } from 'react'
import { placeOrder } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const [name,setName] = useState(''); const nav = useNavigate()
  const items = JSON.parse(localStorage.getItem('cart')||'[]')
  const total = items.reduce((s,x)=>s+(x.price||0),0)
  async function submit(){
    const order = await placeOrder({ customer: name, items, total })
    localStorage.removeItem('cart')
    alert('Order placed (mock): '+order.id)
    nav('/')
  }
  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/>
      </div>
      <div style={{marginTop:8}}>
        <strong>Payable: ₹{total.toFixed(2)}</strong>
      </div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={submit}>Place order (mock)</button>
      </div>
    </div>
  )
}
