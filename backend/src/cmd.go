package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"os"
)

type Cmd struct {
	config *string
}

func NewCmd() Cmd {
	ret := Cmd{
		config: flag.String("config", "./config.json", "location of the configuration"),
	}
	flag.Parse()

	return ret
}

func (c *Cmd) Config() Config {
	config := DefaultConfig()

	r, err := os.Open(*c.config)
	if err != nil {
		return config
	}

	b, err := ioutil.ReadAll(r)
	if err != nil {
		return config
	}

	err = json.Unmarshal(b, &config)
	if err != nil {
		return config
	}

	return config
}
