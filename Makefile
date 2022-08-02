makeDir := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

output = $(makeDir).build
goDir = $(makeDir)back/src
goProtoDir = $(goDir)/protos
protoDir = $(makeDir)protos
staticDir = $(makeDir)static

goFiles = $(shell find $(goDir) -type f)
staticFiles = $(shell find $(staticDir) -type f)
protoFiles = $(shell find $(protoDir) -type f)

.PHONY: clean proto

install: $(output) server copyStatic

$(output):
	mkdir -p $(output)

$(output)/server: protosGo $(goFiles)
	(cd $(goDir) && go build -o $(output)/server)

$(output)/static: $(staticFiles)
	cp -rf $(staticDir) $(output)

protos: $(goProtoDir)

$(goProtoDir): $(protoFiles)
	protoc -I=$(protoDir) --go_out=$(goDir) $(protoDir)/**

clean:
	rm -rf $(output)
	rm -rf $(goProtoDir)