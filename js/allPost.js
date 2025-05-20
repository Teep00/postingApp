// 全ての投稿をまとめて配列化
export function getAllPosts() {
  return Array.from(document.querySelectorAll('.newPost'));
}
