import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const [items, setItems] = useState<any[]>([])
  const nav = useNavigate()
  useEffect(()=> setItems(JSON.parse(localStorage.getItem('cart')||'[]')),[])
  const total = items.reduce((s,x)=>s+(x.price||0),0)
  function remove(i){
    items.splice(i,1)
    localStorage.setItem('cart', JSON.stringify(items))
    setItems([...items])
  }
  return (
    <div>
      <h2>Cart</h2>
      {items.length===0 && <p>Your cart is empty. <Link to="/">Shop now</Link></p>}
      {items.map((it,idx)=>(
        <div key={idx} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
          <img src={it.image} style={{width:80,height:60,objectFit:'cover'}} alt=""/>
          <div style={{flex:1}}>
            <div>{it.title}</div>
            <div>₹{it.price}</div>
          </div>
          <button onClick={()=>remove(idx)}>Remove</button>
        </div>
      ))}
      {items.length>0 && (
        <div style={{marginTop:12}}>
          <strong>Total: ₹{total.toFixed(2)}</strong><br/>
          <button className="btn" onClick={()=>nav('/checkout')}>Checkout</button>
        </div>
      )}
    </div>
  )
}
