import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

const adapter = new JSONFile('db.json');
const db = new Low(adapter, { users: [], posts: [] });
await db.read();

app.get('/users', async (req, res) => {
  const { userName, userId } = req.query;
  await db.read();
  let users = db.data.users;
  if (userName) {
    users = users.filter((user) => user.userName === userName);
  }
  if (userId) {
    users = users.filter((user) => user.userId === userId);
  }
  if (users.length === 0) {
    return res.status(404).json({ error: 'ユーザーが見つかりません' });
  }
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = req.body;
  db.data.users.push(newUser);
  await db.write();
  res.status(201).json(newUser);
});

app.get('/posts', (req, res) => {
  res.json(db.data.posts);
});

app.post('/posts', async (req, res) => {
  const newPost = req.body;
  db.data.posts.push(newPost);
  await db.write();
  res.status(201).json(newPost);
});

const sameId = (a, b) => String(a) === String(b);

app.delete('/posts/:id', async (req, res) => {
  const index = db.data.posts.findIndex((post) =>
    sameId(post.id, req.params.id)
  );
  if (index === -1)
    return res.status(404).json({ error: '投稿が見つかりません' });

  const [deleted] = db.data.posts.splice(index, 1);
  await db.write();
  res.status(200).json({ deletedId: deleted.id });
});

// いいねボタンの処理
app.patch('/posts/:postId/like', async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;

  await db.read();

  const post = db.data.posts.find((p) => p.id === postId);
  const user = db.data.users.find((u) => u.userId === userId);

  if (!post || !user) {
    return res
      .status(404)
      .json({ error: '投稿またはユーザーが見つかりません' });
  }

  const alreadyLiked = post.likedUsers.includes(userId);

  if (alreadyLiked) {
    user.likedPosts = user.likedPosts.filter((id) => id !== postId);
    post.likedUsers = post.likedUsers.filter((id) => id !== userId);
  } else {
    user.likedPosts.push(postId);
    post.likedUsers.push(userId);
  }

  post.likes = post.likedUsers.length;

  await db.write();

  res.json({ likes: post.likes });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
