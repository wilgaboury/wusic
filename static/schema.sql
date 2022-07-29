CREATE TABLE songs (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    album VARCHAR(36),
    track INTEGER,
);

CREATE TABLE artists (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
);

CREATE TABLE album (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
);

CREATE TABLE songs_artists (
    song_id VARCHAR(36),
    artist_id VARCHAR(36),
);

CREATE TABLE artists_albums (
    artist_id VARCHAR(36),
    album_id VARCHAR(36),
);

CREATE TABLE playlists {
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
};

CREATE TABLE playlist_items {
    playlist_id VARCHAR(36),
    id VARCHAR(36),
    type VARCHAR(5) CHECK(type IN ('SONG', 'ALBUM', 'PLAYLIST')),
    track INTEGER,
};