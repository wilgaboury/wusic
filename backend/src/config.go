package main

type Config struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

func DefaultConfig() Config {
	return Config{
		Host: "",
		Port: 8080,
	}
}
