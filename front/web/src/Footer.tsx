import { Component, createEffect, createSignal, onMount } from "solid-js";
import videojs from "video.js";

import styles from "./Footer.module.css";
import { currentSong } from "./global";

export let player: undefined | videojs.Player = undefined;

export const AudioPlayer: Component = () => {
  onMount(() => {
    player = videojs("audio-player", {
      controlBar: {
        fullscreenToggle: false,
      },
      inactivityTimeout: 0,
      controls: true,
      preload: "auto",
      bigPlayButton: false,
    });
    if (currentSong() !== "") {
      player.src({
        src: currentSong(),
        type: "application/x-mpegURL",
      });
    }
    player.show();
  });

  createEffect(() => {
    if (player !== undefined && currentSong() !== "") {
      player.src({
        src: currentSong(),
        type: "application/x-mpegURL",
      });
    }
  });

  const [paused, setPaused] = createSignal<boolean>(true);

  return (
    <div class={styles.FooterContainer}>
      <div class={styles.ControlsContainer}>
        <div class={styles.ControlButton}>
          <box-icon name="skip-previous" color="var(--text-color)" />
        </div>
        <div class={styles.PlayButton} onClick={() => setPaused(!paused())}>
          {paused() ? <box-icon name="play" /> : <box-icon name="pause" />}
        </div>
        <div class={styles.ControlButton}>
          <box-icon name="skip-next" color="var(--text-color)" />
        </div>
      </div>
      <div class={styles.ScrubContainer}>
        <video-js id="audio-player" class="vjs-default-skin" />
      </div>
    </div>
  );
};
