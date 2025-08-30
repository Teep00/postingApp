// ------------------------------------------------------- //
/*      全ての投稿をまとめて配列化する関数                       */
// ------------------------------------------------------- //

export function getAllPosts() {
  return Array.from(document.querySelectorAll('.post'));
}
