import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [products, setProducts] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(()=>{ fetchProducts().then(setProducts).catch(console.error) },[])

  const categories = ['All', 'Accessories', 'Optics', 'Training', 'Knives', 'Backpacks']
  // infer category from title/description in demo
  const withCategory = products.map(p=>({
    ...p,
    category: p.category || (p.title && p.title.toLowerCase().includes('backpack') ? 'Backpacks' : (p.title && p.title.toLowerCase().includes('optic') ? 'Optics' : 'Accessories'))
  }))

  const filtered = withCategory.filter(p=>{
    if(activeCategory !== 'All' && p.category !== activeCategory) return false
    if(q && !(p.title||'').toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="hero fade-in">
        <div className="hero-left">
          <div className="hero-card">
            <h2>BuyGun — Tactical Gear & Accessories</h2>
            <p>Quality gear for training and safe handling. This demo shop shows features like featured products, categories, filters, blog, brands, cart, and an admin panel.</p>
            <div style={{marginTop:18}}>
              <Link className="btn" to="/products">Shop Now</Link>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div style={{position:'relative'}}>
            <div className="badge">HOT</div>
            <img src="https://images.pexels.com/photos/2928147/pexels-photo-2928147.jpeg" style={{width:'100%',borderRadius:8}} alt="hero"/>
          </div>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3 className="section-title">Featured Products</h3>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input className="search" placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)}/>
          <button className="btn hidden" onClick={()=>setMobileFilterOpen(!mobileFilterOpen)}>Filters</button>
        </div>
      </div>

      <div className="layout">
        <aside className="sidebar fade-in" style={{display: mobileFilterOpen ? 'block' : undefined}}>
          <h4 style={{marginTop:0}}>Categories</h4>
          {categories.map(c=>(
            <div key={c} className={`category ${c===activeCategory?'active':''}`} onClick={()=>setActiveCategory(c)}>{c}</div>
          ))}
          <div className="filters">
            <h5 style={{margin:'12px 0 6px'}}>Price</h5>
            <input className="search" placeholder="Max price (₹)" type="number" />
          </div>
        </aside>

        <section>
          <div className="grid">
            {filtered.map(p=>(
              <div className="card fade-in" key={p.id}>
                <img src={p.image} alt={p.title}/>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div className="price">₹{p.price}</div>
                  <Link to={'/product/'+p.id} className="btn">View</Link>
                </div>
              </div>
            ))}
            {filtered.length===0 && <div style={{color:'#9aa0a6'}}>No products match your search.</div>}
          </div>

          <div style={{marginTop:28}}>
            <h3 className="section-title">Top Brands</h3>
            <div className="brands">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Placeholder_view_vector.svg" alt="b"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Placeholder_view_vector.svg" alt="b"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Placeholder_view_vector.svg" alt="b"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Placeholder_view_vector.svg" alt="b"/>
            </div>
          </div>

          <div className="news" style={{marginTop:28}}>
            <div className="main fade-in">
              <h4>Instructions & Training</h4>
              <p style={{color:'#9aa0a6'}}>Safety & training articles to help new shooters. This area would display blog posts or news items.</p>
            </div>
            <div className="list fade-in">
              <div style={{background:'#0d0f11',padding:12,borderRadius:6}}>Rental Firearms & Fees</div>
              <div style={{background:'#0d0f11',padding:12,borderRadius:6}}>Gun Range</div>
              <div style={{background:'#0d0f11',padding:12,borderRadius:6}}>Firearms Classes</div>
            </div>
          </div>
        </section>
      </div>
      <div style={{height:60}}></div>
    </div>
  )
}
