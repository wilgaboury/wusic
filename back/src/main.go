package main

import (
	"fmt"
	"net"
	"net/http"
	"strconv"
)

func CheckErrPanic(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	InitParams()
	InitDb()

	if Params.RunSetup {
		// run setup
	}

	if Params.RunServer {
		addr := net.JoinHostPort(Params.Host, strconv.Itoa(Params.Port))
		fmt.Printf("starting rest server on %s", addr)
		s := http.Server{
			Addr:    addr,
			Handler: NewRouter(),
		}
		s.ListenAndServe()
	}
}
