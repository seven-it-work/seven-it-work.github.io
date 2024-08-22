var CacheUtils = {
  addCacheOnlyToday: (key, value) => {
    const date = new Date();
    CacheUtils.setWithExpires(key, `{"time":"${date.getDate()}","value":"${value}"}`, 1000 * 60 * 60 * 24)
  },
  getCacheOnlyToday: (key) => {
    const withExpires = CacheUtils.getWithExpires(key);
    if (withExpires) {
      const parse = JSON.parse(withExpires);
      if (parse.date && parse.date === new Date().getDate()) {
        return parse.value
      }
    }
  },
  setWithExpires: (key, value, expires) => {
    const date = new Date();
    date.setTime(date.getTime() + expires);
    document.cookie = `${key}=${encodeURI(value)};expires=${date.toGMTString()}`;
  },
  getWithExpires: (key) => {
    const arr = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`));
    if (arr) {
      return decodeURI(arr[2]);
    }
  },
  delWithExpires: (key) => {
    CacheUtils.setWithExpires(key, '', 1)
  },
  setLocalStorage: (key, value) => {
    localStorage.setItem("name", "value");
  },
  getLocalStorage: (key) => {
    localStorage.getItem("name");
  },
  delLocalStorage: (key) => {
    localStorage.removeItem("name");
  },
}
