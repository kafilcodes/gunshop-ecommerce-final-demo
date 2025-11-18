import React, { useEffect, useState } from 'react'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api'

export default function AdminPanel(){
  const [products, setProducts] = useState<any[]>([])
  const [token] = useState(localStorage.getItem('token')||'')
  const [form, setForm] = useState({ title:'', price:0, image:'', description:'', category:'' })
  const [editing, setEditing] = useState(null)
  useEffect(()=>{ fetchProducts().then(setProducts).catch(console.error) },[])
  async function add(){
    if(!token){ alert('Login as admin first'); return }
    if(editing){
      const p = await updateProduct(token, editing.id, form)
      setProducts(prev=>prev.map(x=>x.id===p.id?p:x))
      setEditing(null)
    } else {
      const p = await createProduct(token, form)
      setProducts(prev=>[...prev,p])
    }
    setForm({ title:'', price:0, image:'', description:'', category:'' })
  }
  async function remove(id){
    if(!token){ alert('Login as admin first'); return }
    await deleteProduct(token,id)
    setProducts(prev=>prev.filter(p=>p.id!==id))
  }
  function editProduct(p){
    setEditing(p)
    setForm({ title:p.title, price:p.price, image:p.image, description:p.description, category:p.category||'' })
  }
  return (
    <div>
      <h2>Admin Panel</h2>
      {!token && <div>Please <a href="/login">login as admin</a></div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:12}}>
        <div className="card">
          <h3>{editing?'Edit product':'Add product'}</h3>
          <input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
          <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/>
          <input placeholder="Price" type="number" value={form.price} onChange={(e)=>setForm({...form,price:parseFloat(e.target.value||0)})}/>
          <input placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})}/>
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}></textarea>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button className="btn" onClick={add}>{editing?'Save':'Add'}</button>
            {editing && <button onClick={()=>{setEditing(null); setForm({ title:'', price:0, image:'', description:'', category:'' })}}>Cancel</button>}
          </div>
        </div>
        <div>
          <h3>Products</h3>
          <div className="grid">
            {products.map(p=>(
              <div className="card" key={p.id}>
                <img src={p.image} alt=""/>
                <h4>{p.title}</h4>
                <div>Category: {p.category||'—'}</div>
                <div>₹{p.price}</div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>editProduct(p)}>Edit</button>
                  <button onClick={()=>remove(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p style={{marginTop:12,fontSize:13,color:'#334'}}>Admin actions require a valid token stored in localStorage (login via /login).</p>
    </div>
  )
}
