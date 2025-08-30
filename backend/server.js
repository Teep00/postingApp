// インポート
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

// Expressアプリのセットアップ
const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// LowDBのセットアップ
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { users: [], posts: [] });
await db.read();

// IDの比較関数
const sameId = (a, b) => String(a) === String(b);

// ------------------------------------------------------- //
/*      ユーザー一覧取得の処理                                 */
// ------------------------------------------------------- //

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

  res.json(users);
});

// ------------------------------------------------------- //
/*      ユーザー登録の処理                                    */
// ------------------------------------------------------- //

app.post('/users', async (req, res) => {
  const newUser = req.body;
  db.data.users.push(newUser);
  await db.write();
  res.status(201).json(newUser);
});

// ------------------------------------------------------- //
/*      投稿一覧取得の処理                                    */
// ------------------------------------------------------- //

app.get('/posts', (req, res) => {
  res.json(db.data.posts);
});

// ------------------------------------------------------- //
/*      投稿作成ボタンの処理                                  */
// ------------------------------------------------------- //

app.post('/posts', async (req, res) => {
  const newPost = req.body;
  db.data.posts.push(newPost);
  await db.write();
  res.status(201).json(newPost);
});

// ------------------------------------------------------- //
/*      ユーザーネームを使用して投稿を取得する処理                */
// ------------------------------------------------------- //

app.get('/posts/:userName/search', async (req, res) => {
  const posts = db.data.posts.filter(
    (post) => post.userName === req.params.userName
  );
  res.json(posts);
});

// ------------------------------------------------------- //
/*      投稿削除ボタンの処理                                  */
// ------------------------------------------------------- //

app.delete('/posts/:id', async (req, res) => {
  const postId = String(req.params.id);

  const index = db.data.posts.findIndex((post) => sameId(post.id, postId));
  if (index === -1)
    return res.status(404).json({ error: '投稿が見つかりません' });

  db.data.users.forEach((user) => {
    user.likedPosts = user.likedPosts.filter(
      (likedId) => !sameId(likedId, postId)
    );
  });

  const [deleted] = db.data.posts.splice(index, 1);
  await db.write();
  res.status(200).json({ deletedId: deleted.id });
});

// ------------------------------------------------------- //
/*      いいねボタンの処理                                    */
// ------------------------------------------------------- //

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

  res.json({
    likes: post.likes,
    likedPosts: user.likedPosts,
    likedUsers: post.likedUsers,
  });
});

// ------------------------------------------------------- //
/*      投稿編集ボタンの処理                                  */
// ------------------------------------------------------- //

app.patch('/posts/:id/edit', async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  const editedPost = db.data.posts.find((post) => sameId(post.id, postId));

  if (!editedPost) {
    return res.status(404).json({ error: '対象の投稿が見つかりません' });
  }

  editedPost.title = title;
  editedPost.body = body;
  editedPost.edited = true;

  await db.write();

  return res.json(editedPost);
});

// ------------------------------------------------------- //
/*      サーバーの起動                                       */
// ------------------------------------------------------- //

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
