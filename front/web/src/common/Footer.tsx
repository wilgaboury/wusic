import {
  Component,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import videojs from "video.js";
import { AudioPlayerContext } from "./AudioPlayerContext";

import styles from "./Footer.module.css";

export let player: undefined | videojs.Player = undefined;

function interpSongUrl(id: string): string {
  return `http://localhost:9090/songs/${id}/master.m3u8`;
}

export const AudioPlayer: Component = () => {
  const [[src, _setSrc], _playSig] = useContext(AudioPlayerContext);

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
    player.show();
  });

  createEffect(() => {
    const src0 = src();
    if (player !== undefined && src0 != null && src0.id !== "") {
      player.src({
        src: interpSongUrl(src0.id),
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
