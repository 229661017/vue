/**
 * 将指定路径或者URL去掉后缀、去掉开头的‘./’、‘/’，并将‘/’后的第一个字母大写
 * @param str
 * @param char
 * @returns {*}
 */
export function getNameByUrlOrPath (str) {
  const char = '/';
  const reg = new RegExp('(' + char + ')' + '(.)', 'g');
  str = str.replace(/^\.\//, '').replace(/\.\w+$/, '').replace(/^\//, '')
  str = str.replace(reg, function (a, b, c) {
    return c.toUpperCase();
  });
  return str;
}

/**
 * 判断传入的字符串第一个字符是否为/ ，否增加/ 并返回
 * @param url
 * @returns {*}
 */
export function getPathByUrl (url) {
  if (url.indexOf('/') === 0) {
    return url;
  }
  return '/' + url;
}
