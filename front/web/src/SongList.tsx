import { Component, createResource, For } from "solid-js";
import host from "./host";
import * as api from "./protos/api";

import styles from './SongList.module.css';

const fetchSongs = async (ids: string[]) => {
    const response = await fetch('http://localhost:8080/songs', {method: 'GET'});
    const body = await response.arrayBuffer();
    return api.Songs.decode(new Uint8Array(body)).songs ?? [];
}

const Song: Component<{song: api.Song}> = (props) => {
    return (
        <div class={styles.SongCard}>
            <span>{props.song.name ?? "<Missing Name>"}</span>
        </div>
    );
}

const SongList: Component = () => {
    const [songs, {mutate: mutateSongs, refetch: refetchSongs}] = createResource(fetchSongs);
    console.log(host);

    return (
        <For each={songs() ?? []}>{(song, i) =>
            <Song song = {song}/>
        }</For>
    );
}

export default SongList;