# TinyGo <> WASM "hello world" webapp
-----

## Dependencies

The following instructions assume OSX 10.13+.

Install Golang (1.13+) and TinyGo if you don't already have them. 
```
brew install go@1.13 tinygo
```

Copy `tinygo`'s version of `wasm_exec.js` into your project root. 
This file must match the binary you use to build your WASM.
```
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .
```

Install `goexec`.
```
go mod init <your package name>
go get -u github.com/shurcooL/goexec
```


## Run

Compile project to WASM.
```
GOOS=js GOARCH=wasm tinygo build -o main.wasm
```

Run a web server.
```
goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
```
(You _must_ use a server that's aware of the WASM MIME type. 
A Python `http.server` won't work.)

Go to `localhost:8080` in your browser. If all has gone well, you should see 
"hello webassembly!" in the JS console.


## Resources
- [Lin Clark's illustrated intro to WASM](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/)
- [Golang<>WASM quickstart](https://github.com/golang/go/wiki/WebAssembly)
- [Very helpful debug journal of a TinyGo<>WASM setup | Mariano Gappa](https://marianogappa.github.io/software/2020/04/01/webassembly-tinygo-cheesse/)

Don't want to run TinyGo locally? You can also grab a prebuilt `docker` image 
from Docker Hub.
```
docker run -v $GOPATH:/go -e "GOPATH=/go" tinygo/tinygo:0.18.0 tinygo build -o main.wasm
```
