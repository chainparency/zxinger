# ZXinger

An ESM ready QR code scanner along with a nice web component you can drop in anywhere. This is a fork and cleanup of the [ZXing library](https://github.com/zxing-js/library) to make it work as an ESM module. 

We will keep trying to modernize this library to ESM standards and we do accept pull requests, so please contribute if you can.

## Quickstart

The easiest way is to use the web component.

```html
# TODO
<script type="module">
import 'https://cdn.jsdelivr.net/gh/chainparency/zxinger@0/components/zxinger-scanner.js'

document.querySelector("zxinger").addEventListener("change", (e) => console.log("result:", e.detail.value))
document.querySelector("#scanButton").addEventListener("click", () => document.querySelector("#zxinger").open())
</script>

<zxinger-scanner id="zxinger"></zxinger-scanner>
<button id="scanButton"></button>
```

