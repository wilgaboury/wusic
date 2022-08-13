import { createContext, createSignal, Signal } from "solid-js";

type AudioPlayerContextType = [src: Signal<string>, song: Signal<boolean>];

export const makeAudioPlayerContext = (): AudioPlayerContextType => {
  const [src, setSrc] = createSignal("");
  const [play, setPlay] = createSignal(false);
  return [
    [src, setSrc],
    [play, setPlay],
  ];
};

export const AudioPlayerContext = createContext<AudioPlayerContextType>(
  makeAudioPlayerContext()
);
