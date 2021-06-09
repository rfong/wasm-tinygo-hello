// Example modified from https://tinygo.org/docs/guides/webassembly/

const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = 'main.wasm';

var wasm;

if ('instantiateStreaming' in WebAssembly) {
  WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
    wasm = obj.instance;
    go.run(wasm);
  })
} else {
  fetch(WASM_URL).then(resp =>
    resp.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
    })
  )
}
