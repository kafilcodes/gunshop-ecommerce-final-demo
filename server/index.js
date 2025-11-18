// server/index.js (ESM)
import express from 'express';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dbFile = path.join(__dirname, 'data', 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDB(){
  await db.read();
  db.data = db.data || { users: [], products: [], orders: [] };
  // seed admin user
  if (!db.data.users.find(u => u.email === 'admin@gunshop.test')) {
    const hash = bcrypt.hashSync('AdminPass123', 10);
    db.data.users.push({ id: nanoid(), email: 'admin@gunshop.test', password: hash, role: 'admin' });
  }
  // seed sample products
  if (!db.data.products || db.data.products.length === 0) {
    db.data.products = [
      { id: nanoid(), title: "Tactical Range Backpack", price: 149.99, image: "https://images.pexels.com/photos/889709/pexels-photo-889709.jpeg", description: "Durable range backpack with multiple compartments." },
      { id: nanoid(), title: "Precision Optic (Replica)", price: 299.00, image: "https://images.pexels.com/photos/2928147/pexels-photo-2928147.jpeg", description: "High clarity optic for demonstration purposes." },
      { id: nanoid(), title: "Training Dummy (Non-functional)", price: 89.50, image: "https://images.pexels.com/photos/163480/war-desert-guns-gunshow-163480.jpeg", description: "Training aid for safe handling practice." }
    ];
  }
  await db.write();
}
await initDB();

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '8h' });
  res.json({ token, user: { email: user.email, role: user.role } });
});

// Public products
app.get('/api/products', async (req, res) => {
  await db.read();
  res.json(db.data.products || []);
});

// Admin middleware
function requireAdmin(req, res, next){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error:'Missing token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ error:'Forbidden' });
    req.user = payload;
    next();
  } catch(err){
    return res.status(401).json({ error:'Invalid token' });
  }
}

// Admin CRUD
app.post('/api/admin/products', requireAdmin, async (req,res)=>{
  await db.read();
  const p = { id: nanoid(), ...req.body };
  db.data.products.push(p);
  await db.write();
  res.json(p);
});

app.put('/api/admin/products/:id', requireAdmin, async (req,res)=>{
  await db.read();
  const idx = db.data.products.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error:'Not found' });
  db.data.products[idx] = { ...db.data.products[idx], ...req.body };
  await db.write();
  res.json(db.data.products[idx]);
});

app.delete('/api/admin/products/:id', requireAdmin, async (req,res)=>{
  await db.read();
  db.data.products = db.data.products.filter(x => x.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

// Orders (mock)
app.post('/api/orders', async (req,res)=>{
  const order = { id: nanoid(), createdAt: Date.now(), ...req.body };
  await db.read();
  db.data.orders.push(order);
  await db.write();
  res.json(order);
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Server running on', port));
