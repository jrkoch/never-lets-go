import app from './app';
import dashboard from './dashboard';

document.addEventListener("DOMContentLoaded", () => {
  const isDashboard = window.location.search.indexOf('dashboard') > -1;
  const runner = isDashboard ? dashboard : app;
  runner.start();
});
