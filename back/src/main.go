package main

import (
	"log"
	"net"
	"net/http"
	"strconv"
)

func CheckErrFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	InitParams()
	// InitDb()

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
