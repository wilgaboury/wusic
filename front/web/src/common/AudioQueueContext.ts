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
}

export interface AudioQueueState {
  songs: Song[];
  idx: number;
}

export const makeAudioQueueContext = ([
  [_src, setSrc],
  [_play, _setPlay],
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
  };
};

export const DefaultAudioQueueContextValue = makeAudioQueueContext(
  DefaultAudioPlayerContextValue
);

export const AudioPlayerContext = createContext(DefaultAudioQueueContextValue);
