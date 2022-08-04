import { Component, onMount, createEffect } from 'solid-js';

import videojs from 'video.js';

import styles from './AudioPlayer.module.css';
import { audioSource } from './global';

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "video-js": JSX.IntrinsicElements["video"];
        }
    }
}

export let player: undefined | videojs.Player = undefined;

export const AudioPlayer: Component = () => {
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
        if (audioSource() !== '') {
            player.src({
                src: audioSource(),
                type: "application/x-mpegURL",
            });
        }
        player.show();
    });

    createEffect(() => {
        if (player !== undefined && audioSource() !== '') {
            player.src({
                src: audioSource(),
                type: "application/x-mpegURL",
            });
        }
    })

    return (
        <div class={styles.BottomPlayerBarContainer}>
            <video-js
                id="audio-player"
                class="vjs-default-skin"
            />
        </div>
    );
}