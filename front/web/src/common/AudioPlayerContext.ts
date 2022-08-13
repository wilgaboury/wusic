import { createContext, createSignal, Signal } from "solid-js";
import { Song } from "../protos/api";

export type AudioPlayerContextValue = [
  src: Signal<Song>,
  song: Signal<boolean>
];

export const makeAudioPlayerContext = (): AudioPlayerContextValue => {
  const [src, setSrc] = createSignal(Song.fromPartial({}));
  const [play, setPlay] = createSignal(false);
  return [
    [src, setSrc],
    [play, setPlay],
  ];
};

export const DefaultAudioPlayerContext = makeAudioPlayerContext();

export const AudioPlayerContext = createContext<AudioPlayerContextValue>(
  DefaultAudioPlayerContext
);
