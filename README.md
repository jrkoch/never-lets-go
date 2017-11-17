# never-lets-go

A small example Enplug player app that well keep on keepin' on.  It will never leave the screen
once it is displayed for the first time.  This repository was created as a demonstration and will
be short-lived.

## Running the app

Everything needed to run the app is built and committed to the repository in the `dist` folder.
Copy the entire contents of `dist` to the destination of your choice.

Create a new Enplug app to test on your displays.  Point the player URL to `index.html`.  Point the
dashboard URL to `index.html?dashboard`.

Add the never-lets-go app to an Enplug display group.  Also add another app so you can see the
player rotate through.  Then, start up the player.  Once it displays the never-lets-go app, it will
never rotate on to the next app.

## Building

```bash
$ npm install
$ npm run build
```

## Source code

See the `src` folder for the JavaScript source code.
