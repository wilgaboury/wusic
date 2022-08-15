import { createContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Song } from "../protos/api";
import {
  AudioPlayerContextValue,
  DefaultAudioPlayerContextValue,
} from "./AudioPlayerContext";

export interface AudioQueueContextValue {
  canNext: () => boolean;
  next: () => void;
  canPrev: () => boolean;
  prev: () => void;
  playNext: (songs: Song[]) => void;
  addNext: (songs: Song[]) => void;
  replace: (songs: Song[]) => void;
}

export interface AudioQueueState {
  songs: Song[];
  idx: number;
}

export const makeAudioQueueContext = ([
  [_src, setSrc],
  [_play, setPlay],
]: AudioPlayerContextValue): AudioQueueContextValue => {
  const [state, setState] = createStore<AudioQueueState>({ songs: [], idx: 0 });

  return {
    // eslint-disable-next-line
    canNext: () => state.songs.length > 0 && state.idx < state.songs.length - 1,
    // eslint-disable-next-line
    next() {
      if (this.canNext()) {
        setState(produce((s) => (s.idx = Math.min(s.songs.length, s.idx + 1))));
        setSrc(state.songs[state.idx]);
      }
    },
    // eslint-disable-next-line
    canPrev: () => state.songs.length > 0 && state.idx > 0,
    // eslint-disable-next-line
    prev() {
      if (this.canPrev()) {
        setState(produce((s) => (s.idx = Math.max(0, s.idx - 1))));
        setSrc(state.songs[state.idx]);
      }
    },
    playNext: (songs: Song[]) =>
      setState(produce((s) => s.songs.splice(s.idx, 0, ...songs))),
    addNext: (songs: Song[]) =>
      setState(produce((s) => s.songs.push(...songs))),
    replace: (songs: Song[]) => {
      setState(
        produce((s) => {
          s.songs = songs;
          s.idx = 0;
        })
      );
      setPlay(false);
      if (songs.length == 0) setSrc(null);
      else setSrc(songs[0]);
    },
  };
};

export const DefaultAudioQueueContextValue = makeAudioQueueContext(
  DefaultAudioPlayerContextValue
);

export const AudioPlayerContext = createContext(DefaultAudioQueueContextValue);
