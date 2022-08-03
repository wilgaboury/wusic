import { Component, onMount } from 'solid-js';

import videojs from 'video.js';

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "video-js": JSX.IntrinsicElements["video"];
        }
    }
}

let player: null | videojs.Player = null;

const AudioPlayer: Component = () => {
    onMount(() => {
        player = videojs('audio-player', {
            controlBar: {
                fullscreenToggle: false,
            },
            inactivityTimeout: 0,
            controls: true,
            preload: "auto",
            bigPlayButton: false,
            
        });
        player.src({
            src: "http://localhost:9090/2/master.m3u8",
            type: "application/x-mpegURL"
        });
        player.show();
    });

    return (
        <video-js
            id="audio-player"
            class="vjs-default-skin"
        />
    );
}

export default AudioPlayer;