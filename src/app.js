import enplug from '@enplug/player-sdk';
const tickIntervalSeconds = 1;

let count = 0;
let updateTimeout;
let tickCounter;

function tick() {
  count++;

  // I thought that this was because we never got the next asset, and had the player
  // display 1 asset, so I am attempting to get the next one every 10 ticks to trigger
  // the player to change.  It does not seem to have an effect.
  if (count % 10 === 0) {
    enplug.assets.getNext();
  }

  tickCounter.innerText = count + "";
  updateTimeout = setTimeout(tick, tickIntervalSeconds * 1000);
}

const app = {
  start: () => {
    tickCounter = document.getElementById('tick-count');
    document.getElementById('app').style.display = 'block';

    // I had thought that setting the interval here was what was causing the app to stay on
    // the screen indefinitely, but commenting out this line (so that the interval is never set)
    // has no effect.
    tick();

    enplug.appStatus.start();

    // just to be safe...
    enplug.appStatus.setCanInterrupt(true);
  }
}

export default app;
