# ZXinger

An ESM ready QR code scanner with a nice web component you can drop in anywhere. This is a fork and cleanup of the [ZXing library](https://github.com/zxing-js/library) to make it work as an ESM module. 

We will keep trying to modernize this library to ESM standards and we do accept pull requests, so please contribute if you can.

## Demo

[View demo](https://chainparency.github.io/zxinger/)

## Quickstart

The easiest way is to use the web component.

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

### To use from CDN

Just add this inside your `<head></head>` tags then the rest is the same:

```html
<script type="importmap">
  {
    "imports": {
      "zxinger": "https://cdn.jsdelivr.net/gh/chainparency/zxinger@0/index.js"
    }
  }
</script>
```
