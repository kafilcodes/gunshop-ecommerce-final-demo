import axios from 'axios'

// In production, use the environment variable for API URL
// In development, proxy handles /api requests to localhost:4000
const baseURL = import.meta.env.VITE_API_URL || '/api'
const api = axios.create({ baseURL })

export async function fetchProducts(){ const r = await api.get('/products'); return r.data }
export async function login(email,password){ const r = await api.post('/auth/login',{email,password}); return r.data }
export async function createProduct(token, payload){ return (await api.post('/admin/products', payload, { headers: { Authorization: 'Bearer '+token } })).data }
export async function updateProduct(token,id,payload){ return (await api.put('/admin/products/'+id, payload, { headers: { Authorization: 'Bearer '+token } })).data }
export async function deleteProduct(token,id){ return (await api.delete('/admin/products/'+id, { headers: { Authorization: 'Bearer '+token } })).data }
export async function placeOrder(payload){ return (await api.post('/orders', payload)).data }
