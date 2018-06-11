export function isSafari() {
  return navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1
}

export function isChrome() {
  return navigator.userAgent.indexOf('Chrome') !== -1
}

export function isiPhone() {
  return navigator.userAgent.indexOf('iPhone') !== -1
}
