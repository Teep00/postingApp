// ------------------------------------------------------- //
/*      時間の取得・表示関数                                  */
// ------------------------------------------------------- //

export function currentDate(createdAt, post) {
  // createdAtがあればその日時を、なければ現在の日時を使用
  const date = createdAt ? new Date(createdAt) : new Date();

  // 各データをオブジェクトで取得・管理
  const curr = {
    year: date.getFullYear(),
    month: padZero(date.getMonth() + 1),
    day: padZero(date.getDate()),
    hours: padZero(date.getHours()),
    minutes: padZero(date.getMinutes()),
    time: date.getTime(),
  };

  // 投稿要素にタイムスタンプをデータ属性として追加
  post.dataset.timeStamp = curr.time;

  // 投稿時間を表示
  post.querySelector('.timeArea').innerHTML = `
    <div class="date">
      ${curr.year}年${curr.month}月${curr.day}日
    </div>
    <div class="time">
      ${curr.hours}:${curr.minutes}
    </div>
    <p class="edited isHidden">(編集後)</p>
  `;
}

// ------------------------------------------------------- //
/*      現在時刻が1桁の時、2桁にする関数                        */
// ------------------------------------------------------- //

function padZero(num) {
  return num.toString().padStart(2, '0');
}
