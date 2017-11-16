const tickIntervalSeconds = 1;

let count = 0;
let updateTimeout;

const elem = document.getElementById('status');

function tick() {
  elem.innerText = `tick() has fired ${++count} times.`;
  updateTimeout = setTimeout(tick, tickIntervalSeconds * 1000);
}

export default tick;
