# Backbone-serverside - Node.js server-side Backbone adapters

This project helps to run Backbone applications on node.js servers. It includes a few replacements
of Backbone classes that are DOM dependent (history and view). After this Backbone is still jQuery
dependent, but e.g. Cheerio can be used for server-side jQuery subset.

The project assumes Node.js on the server side. It is intended as a workaround for the robots
(so that you would not need to write a separate server-side app for them).

The service is with Backbone 1.0, yet it might work for earlier or later revisions, too.

## Installation

Installing the project itself is easy. Both build system dependencies and app dependencies are triggered by

    > npm install

## Usage

The replacements alone will only take you half-way. Currently the project includes an example on how to apply
them with RequireJS and Node.js / Express. Use it as a boilerplate for your app.

Try the example through the bundled RequireJS + Express version. Within the 'express/requirejs' directory, run

    > bower install
    > npm install

It should be noted that you need to have bower installed to pull the client-side dependencies.

## TODO

* Write better usage instructions & little bit on the context
* The server is fragile and likely multiple concurrent requests will cause a lot of headache.
* Use express-device for detecting robots to better understand on how to deal with different agents
* Anybody heard of writing tests for your app?

## Release History

* 2013/03/25 - v0.1.0 - Initial release

## License

Copyright (c) 2013 Lauri Svan, licensed for users and contributors under MIT license.
https://github.com/laurisvan/backbone-serverside/blob/master/LICENSE-MIT
