CREATE TABLE songs (
    id varchar(36),
    name varchar(255),
    album varchar(36),
    track integer,
    realease varchar(36)
);

CREATE TABLE artists (
    id varchar(36),
    name varchar(255),
);

CREATE TABLE album (
    id varchar(36),
    name varchar(255),
);

CREATE TABLE song_artists (
    song_id varchar(36),
    artist_id varchar(36),
);

CREATE TABLE artist_albums (
    artist_id varchar(36),
    album_id varchar(36),
);