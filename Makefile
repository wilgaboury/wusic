makeDir := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

output = $(makeDir)/.build
goDir = $(makeDir)/back/src
goProtoDir = $(goDir)/protos
protoDir = $(makeDir)/protos
staticDir = $(makeDir)/static

.PHONY: clean proto

install: makeOutputDir server copyStatic

makeOutputDir:
	mkdir -p $(output)

server: protosGo $(goDir)/**
	(cd $(goDir) && go build -o $(output)/server)

copyStatic: ./static/**
	cp -r ./static $(output)/static

protos: protosGo

protosGo: $(protoDir)/**
	protoc -I=$(protoDir) --go_out=$(goDir) $(protoDir)/**

clean:
	rm -rf $(output)
	rm -rf $(goProtoDir)