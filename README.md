# wusic
project to build a self hosted music server, admin web ui, and player

## Currently Planned Tech Stack
* server is simple rest api written in go using chi routing lib and sqlite3 backing database
* rest api uses protobuf as exchange format
* apache used serve m3u8 files and audio data over hls
* a jetpack compose android player
* a solidjs web player and management interface