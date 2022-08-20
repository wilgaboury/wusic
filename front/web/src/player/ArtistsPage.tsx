import { Component, createResource, For } from "solid-js";
import { hostname, restPort } from "../common/Host";
import { ApiGet, Artist, Artists } from "../protos/api";

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: Component<ArtistCardProps> = (props) => {
  return <div>{props.artist.name}</div>;
};

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
    <For each={artists()}>{(artist) => <ArtistCard artist={artist} />}</For>
  );
};

export default ArtistsPage;
