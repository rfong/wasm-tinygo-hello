# Troubleshooting log

## Hello world setup

[Very helpful debug journal of a TinyGo<>WASM setup](https://marianogappa.github.io/software/2020/04/01/webassembly-tinygo-cheesse/)

> JS console error `Uncaught (in promise) TypeError: WebAssembly.instantiate(): Import #0 module="env" error: module is not an object or function`
[A](https://dev.to/timonweb/comment/cphg): Try copying `wasm_exec.js` from your version of golang/tinygo: `cp $(go env GOROOT)/misc/wasm/wasm_exec.js .` or `wget https://raw.githubusercontent.com/tinygo-org/tinygo/master/targets/wasm_exec.js`


via marianogappa blog: Do you definitely have the version of `wasm_exec.js` that matches the version of `go` or `tinygo` with which you built the WASM file?
```
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .
```

Unable to run a `server.go` that imports `net`? See [stdlib packages supported by TinyGo](https://tinygo.org/docs/reference/lang-support/stdlib/).

> JS console error `Uncaught (in promise) TypeError: WebAssembly.instantiate(): Import #0 module="wasi_snapshot_preview1" error: module is not an object or function`
Missing `wasi_snapshot_preview1` indicates a compilation/environment issues 

Presumably looking for `[wasm-tool/wasi](https://github.com/wasm-tool/wasi)`.
```
npm init
npm install --save-dev @wasm-tool/wasi
```
Later realized this wasn't necessary. Probably grabbing the TinyGo specific version of `wasm_exec.js` that fixed it.

As someone who hates frontend bundling overhead, is there a way to use `npm` modules without `webpack` or a similarly heavy bundler system?

["A Future Without Webpack" | pika.dev](https://www.pika.dev/blog/pika-web-a-future-without-webpack): [Snowpack.dev](https://www.snowpack.dev/) - lightweight build tool that leverages ESM (JS's native module system)
```
npm install --save-dev snowpack
```

## exporting functions between JS and Go

As per [this TinyGo <> WASM example](https://tinygo.org/docs/guides/webassembly/)

> `Import #2 module="env" function="syscall/js.valueGet" error: function import requires a callable`

