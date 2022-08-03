package main

import (
	"os"
	"os/exec"
	"path/filepath"
)

var convertScript string
var ffmpegProcSem Semaphore

func InitFfmpeg() {
	exeLoc, err := os.Executable()
	CheckErrPanic(err)

	convertScript = filepath.Join(exeLoc, "..", "static", "convert.sh")
	ffmpegProcSem = make(Semaphore, 32) // limit number of ffmpeg processes that can be run concurrently
}

// best to run with go as seperate thread
func RunFfmpeg(src, dest string) {
	ffmpegProcSem.P(1)
	exec.Command(convertScript, src, dest)
	ffmpegProcSem.V(1)
}
