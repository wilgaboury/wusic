import { Component, createResource, For, useContext } from "solid-js";

import { AudioPlayerContext } from "./common/AudioPlayerContext";
import host from "./host";
import * as api from "./protos/api";
import styles from "./SongList.module.css";

const fetchSongs = async (ids: string[]) => {
  const response = await fetch("http://localhost:8080/songs", {
    method: "GET",
    body: api.ApiGet.encode({ ids: ids }).finish(),
  });
  const body = await response.arrayBuffer();
  return api.Songs.decode(new Uint8Array(body)).songs ?? [];
};

const Song: Component<{ song: api.Song }> = (props) => {
  const [[_src, setSrc], [_play, _setPlay]] = useContext(AudioPlayerContext);

  return (
    <div
      class={styles.SongCard}
      onClick={() => {
        setSrc(`http://localhost:9090/${props.song.id}/master.m3u8`);
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
