export function currentDate(post) {
  const currDate = new Date();
  function padZero(num) {
    return num.toString().padStart(2, '0');
  }
  const curr = {
    year: currDate.getFullYear(),
    month: padZero(currDate.getMonth() + 1),
    day: padZero(currDate.getDate()),
    hours: padZero(currDate.getHours()),
    minutes: padZero(currDate.getMinutes()),
    time: currDate.getTime(),
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
