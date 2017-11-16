import enplug from '@enplug/player-sdk';
import timer from './timer';

document.addEventListener("DOMContentLoaded", timer);

enplug.appStatus.start();
enplug.appStatus.setCanInterrupt(true);
