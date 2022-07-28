# wusic
project to build a self hosted music server, admin web ui, and player

## Tech
* server: simple rest api written in go using http and protobuf
* music: music files will have metadata stored about them in a sqlite db file
* streaming: will be by converting files with ffmpeg then hosting using apache and serving over hls
