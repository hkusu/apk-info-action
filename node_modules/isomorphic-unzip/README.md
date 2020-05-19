# isomorphic-unzip

This is part of the project [isomorphic-pkg-reader](https://npmjs.com/package/isomorphic-pkg-reader).

Now it's only provide a few simple apis for supporting `isomorphic-pkg-reader`,
it can read the specific entries from a .zip file and parse them to Buffer, it works both for NodeJS and Browsersify/Webpack.

Basically it's just a wrap for `yauzl`(NodeJS) and `zip.js`(browser), and make it has nearly consistence apis. 

### Install

``` js
npm i isomorphic-unzip
```

```javascript
// usage

var Unzip = require('isomorphic-unzip');

// In browser, pass a File/Blob into the constructor
var unzip = new Unzip(file /* or blob */);

// In NodeJS, pass the dest path of your file
var unzip = new Unzip('/location/to/your/path');

// They have the same api: getBuffer
unzip.getBuffer(['androidmanifest.xml', 'resources.arsc'], function(err, buffers) {
  if(err) throw err;


  // buffers it's like {'androidmanifest.xml': Buffer, 'resources.arsc': Buffer}
  console.log(buffers);
});

```

### API

#### unzip.getBuffer(whatYouNeed, callback)
`whatYouNeed` is an array of String/RegExp/Function that contains the entry name you want to access, the `callback` will receive two params as callback(error, buffers).
`buffers` is a object that use the entry name as key, Buffer object as value.

When an check function is passed into the `whatYouNeed` array, it will be called like: 
checkFunc(entryName), when it return `true`, means this is what you need, just like `Array.prototype.filter`.


#### unzip.getEntries(callback, onEnd)

Things become a little different here between NodeJS/browser because in Node we use `lazy read entry` feature,
that means you need go through the next entry by yourself.
   
##### So in NodeJS
The callback function will be called like: `callback(error, zipfile, entry, next)`,
you can get the entry's basic information by the `entry` param, also you can get this entry's data via a static method `Unzip.getEntryData`.

```javascript
// The eaisest example is just in the source code in 'zip-node.js - Unzip.prototype.getBuffer'
unzip.getEntries(function(error, zipfile, entry, next) {
  if (error) throw error;

  // Do some stuff with the entry, like find some specific entry out.
  if (entry.fileName) {
  
  }
});

```
 
##### In browser
It's more simpler in browser, the callback function will be called like: `callback(entries)`, all entries will be passed as an array to the callback function.
You can find more information from the `zip.js` document [here](http://gildas-lormeau.github.io/zip.js/core-api.html).


##### Notice
The `entry` object is different between NodeJS and browser, we havn't make it consistence yet, please checkout each documents for more details([yauzl(NodeJS)](https://www.npmjs.com/package/yauzl#class-entry), [zip.js(browser)](http://gildas-lormeau.github.io/zip.js/core-api.html)).


#### Unzip.getEntryData(zipfile, entry, callback)
(NodeJS only)

This method is only for NodeJS, basically you can just use it together with `unzip.getEntries` when you want to access this entry's data.

More information you can get from the `yauzl`'s [document](https://www.npmjs.com/package/yauzl#usage).

We haven't make it totally consistence between NodeJS/browser yet, maybe latter.
 
