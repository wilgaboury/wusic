output = .target

all: output server copyStatic

output:
	mkdir -p $(output)

server: ./backend/src/**
	( cd ./backend/src && go build -o ../../$(output)/server )

copyStatic: ./static/**
	cp -r ./static $(output)/static

proto:

clean:
	rm -rf $(output)