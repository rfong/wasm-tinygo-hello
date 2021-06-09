build:
	GOOS=js GOARCH=wasm tinygo build -o main.wasm

serve:
	goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
