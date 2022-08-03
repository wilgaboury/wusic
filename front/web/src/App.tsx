import { Component } from 'solid-js';

import styles from './App.module.css';

import AudioPlayer from './AudioPlayer';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <AudioPlayer/>
      </header>
    </div>
  );
};

export default App;
