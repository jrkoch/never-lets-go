# never-lets-go

A small example Enplug player app that will keep on keepin' on.  It will never leave the screen
once it is displayed for the first time.  This repository was created as a demonstration and will
be short-lived.

## Running the app

Everything needed to run the app is built and committed to the repository in the `dist` folder.
Copy the entire contents of `dist` to the destination of your choice.

Create a new Enplug app to test on your displays.  Point the player URL to `index.html`.  Point the
dashboard URL to `index.html?dashboard`.  Set the app to display 1 asset.

Add the never-lets-go app to an Enplug display group.  Also add another app so you can see the
player rotate through.  Then, start up the player.  Once it displays the never-lets-go app, it will
never rotate on to the next app.

## What I've tried

I've tried a couple of things to get the app to allow the transition.

### enplug.appStatus.setCanInterrupt

Calling `enplug.appStatus.setCanInterrupt(true);` in order to ensure the app can be interrupted (see
`app.js` line 35) has no effect.

### setTimeout

Our actual app reloads live data from our servers by repeatedly deferring calls with `setTimeout`,
which is behavior I've recreated in this demo app.  I thought that that might be causing a problem,
so I've also tried this demo app without deferring any calls.  It appears to have no effect.  You
can disable setting out interval by commenting the call to `tick()` on line 30 of `app.js`.

### enplug.assets.getNext()

My next thought was that perhaps it had to do with setting the app to display 1 asset.  I tried a
couple of things to investigate this:

* Setting the app to play for 30 seconds each time instead of playing one asset.  This had no
  effect.
* Repeatedly calling `enplug.assets.getNext()` in an attempt to tell the SDK that we are playing
  through the assets (see line 15 of `app.js`).  This also appeared to have no effect.

## Building

```bash
$ npm install
$ npm run build
```

## Source code

See the `src` folder for the JavaScript source code.

* `app.js` contains code for the player app.
* `dashboard.js` contains code fo the dashboard.
* `index.js` reads the query string used to load the document and calls the appropriate module.
