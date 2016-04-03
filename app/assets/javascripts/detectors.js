function iOSVersion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    // return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    return parseInt(v[1], 10);
  }
  else return -1;
}

function disableLines(){
  return (iOSVersion() > 0 && iOSVersion() < 9) ||
    (window.screen.availWidth < 375) || window.hasOwnProperty('ontouchstart') || true;
}
