makeDir := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

output = $(makeDir)/.build
goDir = $(makeDir)/back/src
goProtoDir = $(goDir)/proto
protoDir = $(makeDir)/proto

.PHONY: clean proto

build: makeOutputDir server copyStatic

makeOutputDir:
	mkdir -p $(output)

server: protoGo $(goDir)/**
	(cd $(goDir) && go build -o $(output)/server)

copyStatic: ./static/**
	cp -r ./static $(output)/static

proto: protoGo

protoGo: $(protoDir)/**
	protoc -I=$(protoDir) --go_out=$(goDir) $(protoDir)/**

clean:
	rm -rf $(output)
	rm -rf $(goProtoDir)