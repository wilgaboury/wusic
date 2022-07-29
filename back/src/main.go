package main

import (
	"net"
	"net/http"
	"strconv"
)

func main() {
	InitParams()

	if Params.RunSetup {
		// run setup
	}

	if Params.RunServer {
		s := http.Server{
			Addr:    net.JoinHostPort(Params.Host, strconv.Itoa(Params.Port)),
			Handler: NewRouter(),
		}
		s.ListenAndServe()
	}
}
