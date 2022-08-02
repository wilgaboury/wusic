#/bin/bash
ffmpeg -i $1 -map 0:a -c:a aac -b:a 192k -ac 2 -f hls -hls_time 10 -hls_list_size 0 -preset ultrafast -flags -global_header $2.m3u8