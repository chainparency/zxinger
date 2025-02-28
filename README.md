# ZXinger

An ESM ready QR code scanner with a nice web component you can drop in anywhere. This is a fork and cleanup of the [ZXing library](https://github.com/zxing-js/library) to make it work as an ESM module. 

We will keep trying to modernize this library to ESM standards and we do accept pull requests, so please contribute if you can.

## Demo

[View demo](https://chainparency.github.io/zxinger/)

## Quickstart

### Install with npm

```sh
npm install chainparency/zxinger
```

### To use from CDN

Just add this inside your `<head></head>` tags then the rest is the same:

```html
<script type="importmap">
  {
    "imports": {
      "zxinger": "https://cdn.jsdelivr.net/gh/chainparency/zxinger@1/"
    }
  }
</script>
```

### Usage

The easiest way is to use the `zxinger-scanner` web component.

```html
# TODO
<script type="module">
import 'zinger/components/zxinger-scanner.js'

document.querySelector("zxinger").addEventListener("change", (e) => console.log("result:", e.detail.value))
document.querySelector("#scanButton").addEventListener("click", () => document.querySelector("#zxinger").open())
</script>

<zxinger-scanner id="zxinger"></zxinger-scanner>
<button id="scanButton"></button>
```

View code for the demo [here](/components/index.html).

If you'd like to do without the component, just copy what's in the [component](components/zxinger-scanner.js) into your own code.

### Choosing specific code formats (to optimize performance / load times)

You can choose the type of code you are scanning to prevent loading unecessary code.

Choose the code type by the filename [in this directory])(/browser).

Then use the name with the `readerName` attribute, eg if you are only using QR codes:

```html
<zxinger-scanner id="zxinger" readerName="BrowserQRCodeReader"></zxinger-scanner>
``` 
