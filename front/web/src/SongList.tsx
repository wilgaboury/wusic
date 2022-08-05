import { Component, createResource, For } from "solid-js";
import * as api from "./protos/api";

import styles from './SongList.module.css';

const fetchSongs = async (ids: string[]) => {
    const response = await fetch('http://localhost:8080', {method: 'GET'});
    const body = await response.blob();
    const body2 = await body.arrayBuffer()
    console.log(new Uint8Array(body2));
    return api.Songs.decode(new Uint8Array(body2)).songs ?? [];
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

    return (
        <For each={songs() ?? []}>{(song, i) =>
            <Song song = {song}/>
        }</For>
    );
}

export default SongList;