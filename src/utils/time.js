export function currentDate(createdAt, post) {
  const date = createdAt ? new Date(createdAt) : new Date();

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  const curr = {
    year: date.getFullYear(),
    month: padZero(date.getMonth() + 1),
    day: padZero(date.getDate()),
    hours: padZero(date.getHours()),
    minutes: padZero(date.getMinutes()),
    time: date.getTime(),
  };

  post.dataset.timeStamp = curr.time;
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
