import enplug from '@enplug/player-sdk';
const tickIntervalSeconds = 1;

let count = 0;
let updateTimeout;
let tickCounter;

function tick() {
  tickCounter.innerText = ++count + "";
  updateTimeout = setTimeout(tick, tickIntervalSeconds * 1000);
}

const app = {
  start: () => {
    tickCounter = document.getElementById('tick-count');
    document.getElementById('app').style.display = 'block';
    tick();
    enplug.appStatus.start();
    enplug.appStatus.setCanInterrupt(true);
  }
}

export default app;
