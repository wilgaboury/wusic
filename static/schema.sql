CREATE TABLE songs (
    id TEXT PRIMARY KEY,
    name TEXT,
    album TEXT,
    track INTEGER,
);

CREATE TABLE artists (
    id TEXT PRIMARY KEY,
    name TEXT,
);

CREATE TABLE album (
    id TEXT PRIMARY KEY,
    name TEXT,
);

CREATE TABLE songs_artists (
    song_id TEXT,
    artist_id TEXT,
);

CREATE TABLE artists_albums (
    artist_id TEXT,
    album_id TEXT,
);

CREATE TABLE playlists {
    id TEXT PRIMARY KEY,
    name TEXT,
};

CREATE TABLE playlist_items {
    playlist_id TEXT,
    id TEXT,
    type TEXT,
    track INTEGER,
};