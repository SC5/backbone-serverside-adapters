# Backbone-serverside - Node.js server-side Backbone adapters

This project helps to run isomorphic [Backbone](http://backbonejs.org/) applications on
[node.js](http://nodejs.org/) servers. It intends to provide a feasible subset of a set of adapters
to fill in the blanks of missing DOM and HTML5 APIs on the server side.

For more context on the problematics, see e.g. my
[Mozilla Hacks article](https://hacks.mozilla.org/2013/04/serving-backbone-for-robots-legacy-browsers/) or
[HTML5 DevConf presentation](http://www.slideshare.net/SC5/2013-0402serversidebackbone-18092755), or for
another viewpoint, some of [Spike's isomorphic app presentations](http://www.slideshare.net/spikebrehm).
This project exists for those that don't want to build a full abstraction layer on top of Backbone to hide
jQuery, XHR and Backbone History API problems.

The service is tested for Backbone 1.1.x, yet it might work for earlier or later revisions, too.

## Installation

Installing the project itself is easy. Both build system dependencies and app dependencies are triggered by

    > npm install

## Usage

The adapters are only useful for an isomorphic application. For an example. You will need to have a
node.js server stack and an actual app, such as
[Backbone Serverside, KOA example](https://github.com/SC5/backbone-serverside-koa).
Fork that, or build one of your own from scatch.

## TODO

* The jQuery.ajax emulation is minimal and will likely only work for positive cases for fetching JSON.
* Anybody heard of writing tests for your library?

## Release History

* 2014/03/2 - v0.2.0 - Update adapter dependencies; Update XHR; Move example into its own project.
* 2013/03/25 - v0.1.0 - Initial release

## License

Copyright (c) 2014 [SC5 Online](http://sc5.io/), licensed for users and contributors under
[MIT license](http://opensource.org/licenses/MIT).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/SC5/backbone-serverside-adapters/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

