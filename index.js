// Load and run the WASM file in the browser.
// Modified from https://tinygo.org/docs/guides/webassembly/

const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = 'main.wasm';

// Providing the environment object, used in WebAssembly.instantiateStreaming.
// This part goes after "const go = new Go();" declaration.
/*go.importObject.env = {
	// This function can be used in Go.
  'main.add': function(x, y) {
    return x + y
  }
  // ... other functions
}
*/
// A function to run once `wasm` is loaded
function foo() {
  // Calling a function exported from Go to JS
  console.log('using Go-defined function to multiply two numbers:', wasm.exports.multiply(5, 3));
}

var wasm;

if ('instantiateStreaming' in WebAssembly) {
  WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
    wasm = obj.instance;
    go.run(wasm);
		foo();
  })
} else {
  fetch(WASM_URL).then(resp =>
    resp.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
			foo();
    })
  )
}


