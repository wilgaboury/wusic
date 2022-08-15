import { createContext, createSignal, Signal } from "solid-js";
import { Song } from "../protos/api";

export type AudioPlayerContextValue = [
  src: Signal<Song | null>,
  song: Signal<boolean>
];

export const makeAudioPlayerContext = (): AudioPlayerContextValue => {
  const [src, setSrc] = createSignal(null);
  const [play, setPlay] = createSignal(false);
  return [
    [src, setSrc],
    [play, setPlay],
  ];
};

export const DefaultAudioPlayerContextValue = makeAudioPlayerContext();

export const AudioPlayerContext = createContext(DefaultAudioPlayerContextValue);
