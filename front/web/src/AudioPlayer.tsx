import { Component, onMount } from 'solid-js';

import videojs from 'video.js';

import styles from './AudioPlayer.module.css';

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "video-js": JSX.IntrinsicElements["video"];
        }
    }
}

let player: null | videojs.Player = null;

const AudioPlayer: Component = () => {
    let prevButton: null | videojs.Component = null;
    let nextButton: null | videojs.Component = null;

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

        prevButton = player.controlBar.addChild('Button');
        prevButton.el().innerHTML = '❮';

        nextButton = player.controlBar.addChild('Button');
        nextButton.el().innerHTML = '❯';

        player.controlBar.el().prepend(prevButton.el());
        player.controlBar.el().insertBefore(nextButton.el(), player.controlBar.getChild('volumePanel')?.el() ?? null);

        player.src({
            src: "http://localhost:9090/2/master.m3u8",
            type: "application/x-mpegURL"
        });
        player.show();
    });

    return (
        <div class={styles.BottomPlayerBarContainer}>
            <video-js
                id="audio-player"
                class="vjs-default-skin"
            />
        </div>
    );
}

export default AudioPlayer;