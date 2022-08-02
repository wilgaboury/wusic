import { Component, onMount } from 'solid-js';

import styles from './App.module.css';

import videojs from 'video.js';

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "video-js": JSX.IntrinsicElements["video"] & { controls: boolean, preload: string };
    }
  }
}


const App: Component = () => {
  onMount(() => {
    let player = videojs('my-player');
    player.src({
      src: "http://localhost:9090/1/playlist.m3u8",
      type: "application/x-mpegURL"
    });
    player.show()
  })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a> */}
        <video-js
          id="my-player"
          class="vjs-default-skin" 
          controls 
          preload="auto" 
          width="640" 
          height="268"
        />
      </header>
    </div>
  );
};

export default App;
