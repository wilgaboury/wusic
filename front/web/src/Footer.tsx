import { Component, onMount, createEffect, createSignal } from 'solid-js';

import videojs from 'video.js';

import styles from './Footer.module.css';
import { currentSong } from './global';

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
        if (currentSong() !== '') {
            player.src({
                src: currentSong(),
                type: "application/x-mpegURL",
            });
        }
        player.show();
    });

    createEffect(() => {
        if (player !== undefined && currentSong() !== '') {
            player.src({
                src: currentSong(),
                type: "application/x-mpegURL",
            });
        }
    })

    const [paused, setPaused] = createSignal<boolean>(true);

    return (
        <div class={styles.FooterContainer}>
            <div class={styles.ControlsContainer}>
                <div class={styles.ControlButton}>
                    <img src="/src/assets/icons/prev.svg"/>
                </div>
                <div 
                    class={styles.PlayButton}
                    onclick={() => setPaused(!paused())}
                >
                    {paused() 
                        ? <img src="/src/assets/icons/play.svg"/>
                        : <img src="/src/assets/icons/pause.svg"/>
                    }
                </div>
                <div class={styles.ControlButton}>
                    <img src="/src/assets/icons/next.svg"/>
                </div>
            </div>
            <div class={styles.ScrubContainer}>
                <video-js
                    id="audio-player"
                    class="vjs-default-skin"
                />
            </div>
        </div>
    );
}