## Overview
D-Magazine is a proof-of-concept of the Backfeed decentralized reputation system and economic model.
This MVP is planned to only work internally within the Backfeed Magazine, but plans are to make it into a reusable plugin in the future.
Chances are it might work when you install it on your WordPress website, but we wouldn't count on it yet.

## Installation Instructions
See [INSTALL.MD](INSTALL.MD)

## Files/Folders

* d-magazine.php - the main entry point of the plugin. Imports everything under /lib
* .bowerrc & bower.json - they power `bower install` and populate folder `/vendor/bower_components`
* gulpFile.js - powers the `gulp` command and its tasks
* package.json - metadata for node and `npm`
* /assets
    * /scripts
        * main.js - imports all other files in this folder and does most DOM interactions
        * helpers.js - pure generic functions
        * notyTheme.js - the design of the small notifications that pop up
        * polyfills.js - provides support for older browsers
        * protocolApi.js - sends AJAX requests from the user to `/lib/ajax.php`
        * tour.js - the guided tour
* /dist - created by `gulp` and contains the compiled js/css
* /lib - this plugin's core PHP functions 
    * ajax.php - receives requests from `/scripts/protocolApi.js` and forwards them to Backfeed's API
    * comments.php - turning port comments into contributions
    * protocol-api.php - a client for Backfeed's API
    * queries.php - WP_Queries for posts enhanced by the Backfeed Protocol
    * template-tags.php - functions that output HTML
* /node_modules - created by `npm install`
* /templates - the HTML templates 
    * collabar-guest.php - the footer logged-out users see
    * collabar-user.php - the footer logged-in users see
    * comments.php - the comments displayed below articles
* /vendor - 3rd-party stuff
    * /backend - is only the Requests library that helps with HTTP message passing
    * /bower_components - created by `bower install`
    * /frontend - is only the font-awesome library which is a collection of icons

## Usage Details
Run `gulp watch` in the background when editing *.scss and *.js files to automatically compile them.

Check the browser console to verify the plugin doesn't generate any errors.