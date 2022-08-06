makeDir := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

output = $(makeDir).build
goDir = $(makeDir)back/src
goProtoDir = $(goDir)/protos
protoDir = $(makeDir)protos
staticDir = $(makeDir)static
protoTsPlugin = $(makeDir)front/web/node_modules/.bin/protoc-gen-ts_proto
webProtoDir = $(makeDir)front/web/src/protos

goFiles = $(shell find $(goDir) -type f)
staticFiles = $(shell find $(staticDir) -type f)
protoFiles = $(shell find $(protoDir) -type f)

.PHONY: install clean proto webProto

install: $(output) $(output)/server $(output)/static

$(output):
	mkdir -p $(output)

# TODO this is building when it is not out of date
$(output)/server: $(goProtoDir) $(goFiles)
	(cd $(goDir) && go build -o $(output)/server)

$(output)/static: $(staticFiles)
	cp -rf $(staticDir) $(output)
	touch $(output)/static

proto: $(goProtoDir) $(webProtoDir)

$(goProtoDir): $(protoFiles)
	mkdir -p $(goProtoDir)
	touch $(goProtoDir)
	protoc -I=$(protoDir) --go_out=$(goDir) $(protoDir)/**

webProto: $(webProtoDir)

$(webProtoDir): $(protoFiles)
	mkdir -p $(webProtoDir)
	touch $(webProtoDir)
	protoc \
		-I=$(protoDir) \
		--plugin=$(protoTsPlugin) \
		--ts_proto_out=$(webProtoDir) \
		--ts_proto_opt=esModuleInterop=true \
		$(protoFiles)

clean:
	rm -rf $(output)
	rm -rf $(goProtoDir)
	rm -rf $(webProtoDir)/**