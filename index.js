// Load and run the WASM file in the browser.
// Modified from https://tinygo.org/docs/guides/webassembly/

const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = 'main.wasm';

// Providing the environment object, used in WebAssembly.instantiateStreaming.
// This part goes after "const go = new Go();" declaration.
// This function can be used in Go.
go.importObject.env['main.add'] = function(x, y) {
  return x + y
};

// A function to run once `wasm` is loaded
function foo() {
  // Calling a function exported from Go to JS
  console.log('using Go-defined function to multiply two numbers:', wasm.exports.multiply(5, 3));
}

var wasm;

function postInstantiate(obj) {
	console.log(go.importObject);
  wasm = obj.instance;
  go.run(wasm);
	foo();
}

if ('instantiateStreaming' in WebAssembly) {
  WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(postInstantiate);
} else {
  fetch(WASM_URL).then(resp =>
    resp.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, go.importObject).then(postInstantiate)
  )
}


