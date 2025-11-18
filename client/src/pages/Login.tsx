import React, { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''), [pw,setPw]=useState('')
  const nav = useNavigate()
  async function submit(e){
    e?.preventDefault()
    try{
      const res = await login(email,pw)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      alert('Logged in')
      nav('/admin')
    }catch(err){
      alert('Login failed')
    }
  }
  return (
    <form onSubmit={submit} style={{maxWidth:420}}>
      <h2>Admin Login</h2>
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
      <div><input placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)}/></div>
      <div style={{marginTop:8}}><button className="btn" type="submit">Login</button></div>
    </form>
  )
}
