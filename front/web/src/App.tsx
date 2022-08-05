import { Component } from 'solid-js';

import styles from './App.module.css';

import { AudioPlayer } from './AudioPlayer';
import SongList from './SongList';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div style="flex-grow: 1">
          <SongList/>
        </div>
        <AudioPlayer/>
      </header>
    </div>
  );
};

export default App;
