package main

import (
	"os"
	"os/exec"
	"path/filepath"
)

type ffmpegRequest struct {
	src  string
	dest string
}

var convertScript string

var ffmpegProcSem Semaphore
var ffmpegRequests chan ffmpegRequest

func InitFfmpeg() {
	exeLoc, err := os.Executable()
	CheckErrPanic(err)

	convertScript = filepath.Join(exeLoc, "..", "static", "convert.sh")
	ffmpegProcSem = make(Semaphore, 32) // limit number of ffmpeg processes that can be run concurrently
	ffmpegRequests = make(chan ffmpegRequest, 500)

	go processFfmpegRequests()
}

func processFfmpegRequests() {
	for {
		req := <-ffmpegRequests
		ffmpegProcSem.P(1)
		go func() {
			cmd := exec.Command(convertScript, req.src, req.dest)
			cmd.Run()
			ffmpegProcSem.V(1)
		}()

	}
}

func FfmpegConvert(src, dest string) {
	ffmpegRequests <- ffmpegRequest{
		src:  src,
		dest: dest,
	}
}
