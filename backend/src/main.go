package main

import (
	"net"
	"net/http"
	"strconv"
)

func main() {
	cmd := NewCmd()
	config := cmd.Config()
	s := http.Server{
		Addr:    net.JoinHostPort(config.Host, strconv.Itoa(config.Port)),
		Handler: NewRouter(),
	}
	s.ListenAndServe()
}
