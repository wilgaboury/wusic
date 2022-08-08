import { createSignal } from 'solid-js';

export const [songQueue, setSongQueue] = createSignal<string[]>([]);
export const [currentSong, setCurrentSong] = createSignal<string>('http://localhost:9090/2/master.m3u8');