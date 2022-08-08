import { Component } from 'solid-js';

import styles from './App.module.css';

import { AudioPlayer } from './Footer';
import Navbar from './Navbar';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Navbar/>
      <div style="flex-grow: 1"/>
      <AudioPlayer/>
    </div>
  );
};

export default App;
