package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"os"
)

type params struct {
	Host      string `json:"host"`
	Port      int    `json:"port"`
	DbDir     string `json:"db_dir"`
	RunSetup  bool   `json:"run_setup"`
	RunServer bool   `json:"run_server"`
	SendStack bool   `json:"send_stack"`
}

var Params params

func DefaultParams() params {
	return params{
		Host:      "",
		Port:      8080,
		DbDir:     "./",
		RunSetup:  true,
		RunServer: true,
		SendStack: true,
	}
}

func ReadParams(floc string, p *params) {
	f, err := os.Open(floc)
	if err != nil {
		return
	}
	defer f.Close()

	b, err := ioutil.ReadAll(f)
	if err != nil {
		return
	}

	json.Unmarshal(b, &p)
}

func InitParams() {
	Params = DefaultParams()

	ReadParams("./config.json", &Params)

	host := flag.String("host", Params.Host, "hostname for the server")
	port := flag.Int("port", Params.Port, "port for the server")
	dbDir := flag.String("db-dir", Params.DbDir, "direction to put or access the database")
	runSetup := flag.Bool("run-setup", Params.RunSetup, "runs setup data syncing processes")
	runServer := flag.Bool("run-server", Params.RunServer, "runs the rest server")
	sendStack := flag.Bool("send-stack", Params.SendStack, "on error a stack trace will be sent")
	flag.Parse()

	Params = params{
		Host:      *host,
		Port:      *port,
		DbDir:     *dbDir,
		RunSetup:  *runSetup,
		RunServer: *runServer,
		SendStack: *sendStack,
	}
}
