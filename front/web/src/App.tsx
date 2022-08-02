import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import videojs from 'video.js';

const App: Component = () => {
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
        <video
          id="my-player"
          class="vjs-default-skin"
          controls
          width="960"
          height="540"
          onload={() => {
            let player = videojs('my-player');
            player.src({
              src: "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8",
              type: "application/x-mpegURL"
            })
          }}
        >
          {/* <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p> */}
        </video>
      </header>
    </div>
  );
};

export default App;
