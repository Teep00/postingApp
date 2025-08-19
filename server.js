import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const adapter = new JSONFile('db.json');
const db = new Low(adapter, { users: [], posts: [] });
await db.read();

app.get('/users', (req, res) => {
  res.json(db.data.users);
});

app.post('/users', async (req, res) => {
  const newUser = req.body;
  db.data.users.push(newUser);
  await db.write();
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
