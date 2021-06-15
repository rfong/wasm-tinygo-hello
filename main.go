// +build js,wasm

package main

import "fmt"

func main() {
	fmt.Println("hello webassembly!")
	fmt.Println("main.go: using JS-defined function to add two numbers:", add(2, 3))
}

// This function is imported from JavaScript, as it doesn't define a body.
// You should define a function named 'main.add' in the WebAssembly 'env'
// module from JavaScript.
func add(x, y int) int

// This function is exported to JavaScript, so it can be called using
// exports.multiply() in JavaScript. The following line tells the build to
// export this function to `wasm.exports`.
//export multiply
func multiply(x, y int) int {
	return x * y
}
