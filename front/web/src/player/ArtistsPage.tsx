import { Component, createResource, For } from "solid-js";
import { hostname, restPort } from "../common/Host";
import { ApiGet, Artists } from "../protos/api";

const fetchArtists = async () => {
  const response = await fetch(`http://${hostname}:${restPort}/artists`, {
    method: "POST",
    body: ApiGet.encode({ ids: [] }).finish(),
  });
  const body = await response.arrayBuffer();
  return Artists.decode(new Uint8Array(body)).artists ?? [];
};

const ArtistsPage: Component = () => {
  const [artists, _] = createResource(fetchArtists);

  return (
    <For each={artists()}>{artist =>
      <div>{artist.name}</div>
    }</For>
  );
};

export default ArtistsPage;
