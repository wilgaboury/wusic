import { Component, createResource, For } from "solid-js";
import { fetchGpb } from "../common/fetchUtil";
import { hostname, restPort } from "../common/Host";
import { ApiGet, Artist, Artists } from "../protos/api";

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: Component<ArtistCardProps> = (props) => {
  return <div>{props.artist.name}</div>;
};

const fetchArtists = async () => {
  return await fetchGpb(`http://${hostname}:${restPort}/artists`, Artists.decode, ApiGet.encode, { ids: [] });
}

const ArtistsPage: Component = () => {
  const [artists, _] = createResource(fetchArtists);

  return (
    <For each={artists()}>{(artist) => <ArtistCard artist={artist} />}</For>
  );
};

export default ArtistsPage;
