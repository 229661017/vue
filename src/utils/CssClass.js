
/**
 * [hasClass description]
 * @param  {[type]}  ele [description]
 * @param  {[type]}  cls [description]
 * @return {Boolean}     [description]
 */
function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * [addClass description]
 * @param {[type]} ele [description]
 * @param {[type]} cls [description]
 */
function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * [removeClass description]
 * @param  {[type]} ele [description]
 * @param  {[type]} cls [description]
 * @return {[type]}     [description]
 */
function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * [toggleClass description]
 * @param  {[type]} element   [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += ' ' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export { hasClass, addClass, removeClass, toggleClass }
