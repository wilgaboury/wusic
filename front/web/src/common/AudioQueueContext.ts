import { createEffect } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Song } from "../protos/api";
import { AudioPlayerContextValue } from "./AudioPlayerContext";

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

  createEffect(() => {
    setSrc(state.songs[state.idx]);
  });

  // TODO make this work correctly

  return {
    canNext: () => state.songs.length > 0 && state.idx < state.songs.length - 1,
    next: () =>
      setState(produce((s) => (s.idx = Math.min(s.songs.length, s.idx + 1)))),
    canPrev: () => state.songs.length > 0 && state.idx > 0,
    prev: () => setState(produce((s) => (s.idx = Math.max(0, s.idx - 1)))),
  };
};
