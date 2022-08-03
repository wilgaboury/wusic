/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "api";

export interface Error {
  title: string;
  details: string;
}

export interface Song {
  id: string;
  name: string;
  artists: ArtistInfo[];
  album: AlbumInfo | undefined;
  track: number;
}

export interface Artist {
  id: string;
  name: string;
  songs: SongInfo[];
  albums: AlbumInfo[];
}

export interface Album {
  id: string;
  name: string;
  songs: SongInfo[];
  artists: ArtistInfo[];
}

export interface SongInfo {
  id: string;
  name: string;
  track: number;
}

export interface ArtistInfo {
  id: string;
  name: string;
}

export interface AlbumInfo {
  id: string;
  name: string;
}

export interface Playlist {
  id: string;
  name: string;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  type: PlaylistItem_Type;
}

export enum PlaylistItem_Type {
  SONG = 0,
  ALBUM = 1,
  PLAYLIST = 2,
  UNRECOGNIZED = -1,
}

export function playlistItem_TypeFromJSON(object: any): PlaylistItem_Type {
  switch (object) {
    case 0:
    case "SONG":
      return PlaylistItem_Type.SONG;
    case 1:
    case "ALBUM":
      return PlaylistItem_Type.ALBUM;
    case 2:
    case "PLAYLIST":
      return PlaylistItem_Type.PLAYLIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlaylistItem_Type.UNRECOGNIZED;
  }
}

export function playlistItem_TypeToJSON(object: PlaylistItem_Type): string {
  switch (object) {
    case PlaylistItem_Type.SONG:
      return "SONG";
    case PlaylistItem_Type.ALBUM:
      return "ALBUM";
    case PlaylistItem_Type.PLAYLIST:
      return "PLAYLIST";
    case PlaylistItem_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ApiGet {
  ids: string[];
}

export interface ApiGetAll {
  time: Date[];
}

export interface Songs {
  songs: Song[];
}

export interface Albums {
  albums: Album[];
}

export interface Artists {
  artists: Artist[];
}

export interface Playlists {
  playlists: Playlist[];
}

function createBaseError(): Error {
  return { title: "", details: "" };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.details !== "") {
      writer.uint32(18).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      details: isSet(object.details) ? String(object.details) : "",
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.title = object.title ?? "";
    message.details = object.details ?? "";
    return message;
  },
};

function createBaseSong(): Song {
  return { id: "", name: "", artists: [], album: undefined, track: 0 };
}

export const Song = {
  encode(message: Song, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.artists) {
      ArtistInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.album !== undefined) {
      AlbumInfo.encode(message.album, writer.uint32(34).fork()).ldelim();
    }
    if (message.track !== 0) {
      writer.uint32(40).int32(message.track);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Song {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.artists.push(ArtistInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.album = AlbumInfo.decode(reader, reader.uint32());
          break;
        case 5:
          message.track = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Song {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      artists: Array.isArray(object?.artists)
        ? object.artists.map((e: any) => ArtistInfo.fromJSON(e))
        : [],
      album: isSet(object.album) ? AlbumInfo.fromJSON(object.album) : undefined,
      track: isSet(object.track) ? Number(object.track) : 0,
    };
  },

  toJSON(message: Song): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    if (message.artists) {
      obj.artists = message.artists.map((e) =>
        e ? ArtistInfo.toJSON(e) : undefined
      );
    } else {
      obj.artists = [];
    }
    message.album !== undefined &&
      (obj.album = message.album ? AlbumInfo.toJSON(message.album) : undefined);
    message.track !== undefined && (obj.track = Math.round(message.track));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Song>, I>>(object: I): Song {
    const message = createBaseSong();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.artists =
      object.artists?.map((e) => ArtistInfo.fromPartial(e)) || [];
    message.album =
      object.album !== undefined && object.album !== null
        ? AlbumInfo.fromPartial(object.album)
        : undefined;
    message.track = object.track ?? 0;
    return message;
  },
};

function createBaseArtist(): Artist {
  return { id: "", name: "", songs: [], albums: [] };
}

export const Artist = {
  encode(
    message: Artist,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.songs) {
      SongInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.albums) {
      AlbumInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Artist {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArtist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.songs.push(SongInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.albums.push(AlbumInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Artist {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      songs: Array.isArray(object?.songs)
        ? object.songs.map((e: any) => SongInfo.fromJSON(e))
        : [],
      albums: Array.isArray(object?.albums)
        ? object.albums.map((e: any) => AlbumInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Artist): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    if (message.songs) {
      obj.songs = message.songs.map((e) =>
        e ? SongInfo.toJSON(e) : undefined
      );
    } else {
      obj.songs = [];
    }
    if (message.albums) {
      obj.albums = message.albums.map((e) =>
        e ? AlbumInfo.toJSON(e) : undefined
      );
    } else {
      obj.albums = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Artist>, I>>(object: I): Artist {
    const message = createBaseArtist();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.songs = object.songs?.map((e) => SongInfo.fromPartial(e)) || [];
    message.albums = object.albums?.map((e) => AlbumInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAlbum(): Album {
  return { id: "", name: "", songs: [], artists: [] };
}

export const Album = {
  encode(message: Album, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.songs) {
      SongInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.artists) {
      ArtistInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Album {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlbum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.songs.push(SongInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.artists.push(ArtistInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Album {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      songs: Array.isArray(object?.songs)
        ? object.songs.map((e: any) => SongInfo.fromJSON(e))
        : [],
      artists: Array.isArray(object?.artists)
        ? object.artists.map((e: any) => ArtistInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Album): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    if (message.songs) {
      obj.songs = message.songs.map((e) =>
        e ? SongInfo.toJSON(e) : undefined
      );
    } else {
      obj.songs = [];
    }
    if (message.artists) {
      obj.artists = message.artists.map((e) =>
        e ? ArtistInfo.toJSON(e) : undefined
      );
    } else {
      obj.artists = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Album>, I>>(object: I): Album {
    const message = createBaseAlbum();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.songs = object.songs?.map((e) => SongInfo.fromPartial(e)) || [];
    message.artists =
      object.artists?.map((e) => ArtistInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSongInfo(): SongInfo {
  return { id: "", name: "", track: 0 };
}

export const SongInfo = {
  encode(
    message: SongInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.track !== 0) {
      writer.uint32(24).int32(message.track);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SongInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSongInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.track = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SongInfo {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      track: isSet(object.track) ? Number(object.track) : 0,
    };
  },

  toJSON(message: SongInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.track !== undefined && (obj.track = Math.round(message.track));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SongInfo>, I>>(object: I): SongInfo {
    const message = createBaseSongInfo();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.track = object.track ?? 0;
    return message;
  },
};

function createBaseArtistInfo(): ArtistInfo {
  return { id: "", name: "" };
}

export const ArtistInfo = {
  encode(
    message: ArtistInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArtistInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArtistInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArtistInfo {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ArtistInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArtistInfo>, I>>(
    object: I
  ): ArtistInfo {
    const message = createBaseArtistInfo();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseAlbumInfo(): AlbumInfo {
  return { id: "", name: "" };
}

export const AlbumInfo = {
  encode(
    message: AlbumInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlbumInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlbumInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AlbumInfo {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: AlbumInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AlbumInfo>, I>>(
    object: I
  ): AlbumInfo {
    const message = createBaseAlbumInfo();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBasePlaylist(): Playlist {
  return { id: "", name: "", items: [] };
}

export const Playlist = {
  encode(
    message: Playlist,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.items) {
      PlaylistItem.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Playlist {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaylist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.items.push(PlaylistItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Playlist {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => PlaylistItem.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Playlist): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    if (message.items) {
      obj.items = message.items.map((e) =>
        e ? PlaylistItem.toJSON(e) : undefined
      );
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Playlist>, I>>(object: I): Playlist {
    const message = createBasePlaylist();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.items = object.items?.map((e) => PlaylistItem.fromPartial(e)) || [];
    return message;
  },
};

function createBasePlaylistItem(): PlaylistItem {
  return { id: "", type: 0 };
}

export const PlaylistItem = {
  encode(
    message: PlaylistItem,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaylistItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaylistItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaylistItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      type: isSet(object.type) ? playlistItem_TypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: PlaylistItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined &&
      (obj.type = playlistItem_TypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaylistItem>, I>>(
    object: I
  ): PlaylistItem {
    const message = createBasePlaylistItem();
    message.id = object.id ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseApiGet(): ApiGet {
  return { ids: [] };
}

export const ApiGet = {
  encode(
    message: ApiGet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiGet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApiGet {
    return {
      ids: Array.isArray(object?.ids)
        ? object.ids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ApiGet): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGet>, I>>(object: I): ApiGet {
    const message = createBaseApiGet();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseApiGetAll(): ApiGetAll {
  return { time: [] };
}

export const ApiGetAll = {
  encode(
    message: ApiGetAll,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.time) {
      Timestamp.encode(toTimestamp(v!), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiGetAll {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGetAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time.push(
            fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApiGetAll {
    return {
      time: Array.isArray(object?.time)
        ? object.time.map((e: any) => fromJsonTimestamp(e))
        : [],
    };
  },

  toJSON(message: ApiGetAll): unknown {
    const obj: any = {};
    if (message.time) {
      obj.time = message.time.map((e) => e.toISOString());
    } else {
      obj.time = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGetAll>, I>>(
    object: I
  ): ApiGetAll {
    const message = createBaseApiGetAll();
    message.time = object.time?.map((e) => e) || [];
    return message;
  },
};

function createBaseSongs(): Songs {
  return { songs: [] };
}

export const Songs = {
  encode(message: Songs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.songs) {
      Song.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Songs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSongs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.songs.push(Song.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Songs {
    return {
      songs: Array.isArray(object?.songs)
        ? object.songs.map((e: any) => Song.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Songs): unknown {
    const obj: any = {};
    if (message.songs) {
      obj.songs = message.songs.map((e) => (e ? Song.toJSON(e) : undefined));
    } else {
      obj.songs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Songs>, I>>(object: I): Songs {
    const message = createBaseSongs();
    message.songs = object.songs?.map((e) => Song.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAlbums(): Albums {
  return { albums: [] };
}

export const Albums = {
  encode(
    message: Albums,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.albums) {
      Album.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Albums {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlbums();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.albums.push(Album.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Albums {
    return {
      albums: Array.isArray(object?.albums)
        ? object.albums.map((e: any) => Album.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Albums): unknown {
    const obj: any = {};
    if (message.albums) {
      obj.albums = message.albums.map((e) => (e ? Album.toJSON(e) : undefined));
    } else {
      obj.albums = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Albums>, I>>(object: I): Albums {
    const message = createBaseAlbums();
    message.albums = object.albums?.map((e) => Album.fromPartial(e)) || [];
    return message;
  },
};

function createBaseArtists(): Artists {
  return { artists: [] };
}

export const Artists = {
  encode(
    message: Artists,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.artists) {
      Artist.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Artists {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArtists();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.artists.push(Artist.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Artists {
    return {
      artists: Array.isArray(object?.artists)
        ? object.artists.map((e: any) => Artist.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Artists): unknown {
    const obj: any = {};
    if (message.artists) {
      obj.artists = message.artists.map((e) =>
        e ? Artist.toJSON(e) : undefined
      );
    } else {
      obj.artists = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Artists>, I>>(object: I): Artists {
    const message = createBaseArtists();
    message.artists = object.artists?.map((e) => Artist.fromPartial(e)) || [];
    return message;
  },
};

function createBasePlaylists(): Playlists {
  return { playlists: [] };
}

export const Playlists = {
  encode(
    message: Playlists,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.playlists) {
      Playlist.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Playlists {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaylists();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.playlists.push(Playlist.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Playlists {
    return {
      playlists: Array.isArray(object?.playlists)
        ? object.playlists.map((e: any) => Playlist.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Playlists): unknown {
    const obj: any = {};
    if (message.playlists) {
      obj.playlists = message.playlists.map((e) =>
        e ? Playlist.toJSON(e) : undefined
      );
    } else {
      obj.playlists = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Playlists>, I>>(
    object: I
  ): Playlists {
    const message = createBasePlaylists();
    message.playlists =
      object.playlists?.map((e) => Playlist.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
