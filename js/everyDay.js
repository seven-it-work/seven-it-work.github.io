// 监听变化

function getEveryDayStr() {
  // https://v.api.aa1.cn/api/yiyan/index.php
  fetch('https://v.api.aa1.cn/api/yiyan/index.php')
    .then(function (res) {
      return res.text()
    }).then(everyDayStr => {
    const s = everyDayStr.replace("<p>", "").replace("</p>", "");
    setTimeout(() => {
      addEveryDayStr(s)
    }, 1000)
  }).catch(()=>{
    setTimeout(() => {
      addEveryDayStr("欢迎来到sevenyjl的博客")
    }, 1000)
  })
}

function addEveryDayStr(str) {
  const text_info = document.getElementById("every-dat-text")
  const str_split = str.split("")
  const p = document.createElement("span");
  p.classList.add('every-dat-animation');
  p.innerText = "";
  text_info.appendChild(p);
//遍历设置为span，定时span的属性中加入动画，
  for (let i = 0; i < str_split.length; i++) {
    setTimeout(() => {
      const temp = document.createElement("span");
      temp.classList.add('every-dat-animation');
      temp.innerText = str_split[i];
      text_info.appendChild(temp);
    }, (i) * (Math.min(500-i,50)))
  }
}
