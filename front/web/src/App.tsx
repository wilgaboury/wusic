import { Component, onMount } from 'solid-js';

import styles from './App.module.css';

import videojs from 'video.js';

import Hls from 'hls.js';

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "video-js": JSX.IntrinsicElements["video"] & { controls: boolean, preload: string };
    }
  }
}


const App: Component = () => {
  // onMount(() => {
  //   let video = document.getElementById('my-player') as HTMLVideoElement;
  //   let videoSrc = 'http://localhost:9090/playlist.m3u8';
  //   console.log("fuck my life");

  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource(videoSrc);
  //     hls.attachMedia(video);
  //   }
  //   else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  //     video.src = videoSrc;
  //   }
  // })

  onMount(() => {
    let player = videojs('my-player');
    player.src({
      src: "http://localhost:9090/1/playlist.m3u8",
      type: "application/x-mpegURL"
    });
    player.show()
  })

  return (
    <div /*class={styles.App}*/>
      {/* <header class={styles.header}> */}
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
        >
          {/* <source src="http://localhost:9090/playlist.m3u8" type="application/x-mpegURL"/> */}
        </video-js>
        {/* <video 
          id="my-player"
          width="640" 
          height="268"
        /> */}
      {/* </header> */}
    </div>
  );
};

export default App;
