function requestGetIp(url, callback, id, gen) {
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      CacheUtils.addCacheOnlyToday('ip', request.responseText)
      callback(id, request.responseText, gen)
    }
  };
  request.open('GET', url);
  request.send()
}

function requestPostWeather(url, callback, params, id, ip) {
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      // CacheUtils.setWithExpires(ip, request.responseText,60*60*24*1000)
      callback(request.responseText, id)
    }
  };
  request.open('POST', url, !0);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(params)
}

function getDataFromApi(id, i, gen) {
  const weatherInfo = CacheUtils.getWithExpires(i);
  if (weatherInfo) {
    updateOnPage(weatherInfo, id)
  } else {
    var v = document.getElementById(id).getAttribute("v");
    var a = document.getElementById(id).getAttribute("a");
    var l = document.getElementById(id).getAttribute("loc");
    var u = document.getElementById(id + '_u').getAttribute("href") + '|||' + document.getElementById(id + '_u').innerHTML;
    if (gen == 1) {
      var ub = ''
    } else {
      var ub = document.getElementById(id).innerHTML
    }
    var i = i;
    var g = gen;
    // 必须有，否则请求失败
    ub = ub.replace('天气加载中...', '天气插件')
    u = u.replace('天气加载中...', '天气插件')
    var params = 'v=' + v + '&a=' + a + '&l=' + l + '&u=' + u + '&ub=' + ub + '&i=' + i + '&g=' + g + '&id=' + id;
    requestPostWeather('https://app2.weatherwidget.org/data/', updateOnPage, params, id, i)
  }
}

function collectData(id, gen) {
  const ipInfo = CacheUtils.getCacheOnlyToday('ip');
  if (ipInfo) {
    getDataFromApi(id, ipInfo, gen)
  } else {
    if (document.getElementById(id).getAttribute("loc") === 'auto') {
      requestGetIp('https://ip.weatherwidget.org/', getDataFromApi, id, gen)
    } else {
      getDataFromApi(id, !1, gen)
    }
  }
}

function updateOnPage(data, id) {
  if (typeof JSON.parse === "undefined") {
    data = JSON.decode(data)
  } else {
    data = JSON.parse(data)
  }
  if (data.hasOwnProperty("a")) {
    if (data.a.hasOwnProperty("html")) {
      document.getElementById(id).innerHTML = data.a.html
      const elementById = document.getElementById(id);
      // 自定义样式
      elementById.style.background = ``
      // 修改背景
      const wPng = elementById.innerHTML.match(/https.*?\.jpg/g)
      if (wPng) {
        addFadeInBackground(wPng, document.getElementsByClassName('header')[0])
      }
    }
    if (data.a.hasOwnProperty("style")) {
      document.getElementById(id).style.cssText = data.a.style
    }
    if (data.a.hasOwnProperty("jsCode")) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.async = !1;
      script.text = data.a.jsCode;
      document.getElementsByTagName('head')[0].appendChild(script)
    }
    if (data.a.hasOwnProperty("ub")) {
      document.getElementById(id + '_info_box_inner').innerHTML = data.a.ub;
      updateInfobox(id, data.a.ub);
      loadingToggle(id, 2)
    }
  } else if (data.hasOwnProperty("error_code")) {
    document.getElementById(id).innerHTML = '';
    console.log('weatherwidget.org / Error: ' + data.error_msg + ' (Error code ' + data.error_code + ')')
  }
}

function updateWidget(id, gen) {
  // 特定样式，防止没有加载出来时看不见标题
  document.getElementsByClassName('header')[0].style.backgroundColor = `#000000`

  if (gen === 1) {
    loadingToggle(id, 1)
  }
  collectData(id, gen)
}

updateWidget('ww_4b54bde5f3d24', 0);

/**
 * 图片背景过渡
 * @param url
 * @param domId
 */
function addFadeInBackground(url, element) {
  const background = new Image();
  background.src = url;
  background.onload = function () {
    const loadbackground = element;
    loadbackground.style.backgroundImage = 'url(' + background.src + ')';
  }
  element.animate([
    {
      offset: 0,
      opacity: 0
    },
    {
      offset: 1,
      opacity: 1
    }
  ], {
    duration: 3000,
    easing: 'linear',
    delay: 0,
    iterations: 1,
    direction: 'normal',
    fill: 'none'
  })
  let isSet = false
   element.addEventListener("animationend", function (e) {
    if (!isSet) {
      getEveryDayStr()
      isSet = true
    }
  }, false);
}
