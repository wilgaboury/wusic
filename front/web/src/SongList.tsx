import { Component, createResource, For, useContext } from "solid-js";

import { AudioPlayerContext } from "./common/AudioPlayerContext";
import { host, restPort } from "./common/Host";
import * as api from "./protos/api";
import styles from "./SongList.module.css";

const fetchSongs = async (ids: string[]) => {
  const response = await fetch(`http://${host}:${restPort}/songs`, {
    method: "POST",
    body: api.ApiGet.encode({ ids: ids }).finish(),
  });
  const body = await response.arrayBuffer();
  return api.Songs.decode(new Uint8Array(body)).songs ?? [];
};

const Song: Component<{ song: api.Song }> = (props) => {
  const [[_src, _setSrc], [_play, _setPlay]] = useContext(AudioPlayerContext);

  return (
    <div
      class={styles.SongCard}
      onClick={() => {
        // setSrc(`http://${host}:${apachePort}/${props.song.id}/master.m3u8`);
      }}
    >
      <span>{props.song.name ?? "<Missing Name>"}</span>
    </div>
  );
};

const SongList: Component = () => {
  const [songs, _] = createResource(fetchSongs);
  console.log(host);

  return (
    <div class={styles.SongListContainer}>
      <For each={songs() ?? []}>{(song) => <Song song={song} />}</For>
    </div>
  );
};

export default SongList;
