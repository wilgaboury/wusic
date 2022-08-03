import { Component, createResource } from "solid-js";
import { ApiGet } from "./protos/api";

const fetchSongs = async (ids: string[]) => {
    const response = await fetch('http:/localhost:8080/songs', {
        method: 'GET',
        body: ApiGet.encode({
            ids: [ '1', '2' ]
        }).finish(),
    });
}

const SongList: Component = () => {


    return (
        <div></div>
    )
}

export default SongList;