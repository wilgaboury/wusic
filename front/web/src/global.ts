import { createSignal } from 'solid-js';

export const [audioSource, setAudioSource] = createSignal<string>('http://localhost:9090/2/master.m3u8');


