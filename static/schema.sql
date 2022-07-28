CREATE TABLE songs (
    id binary(128),
    name varchar(255),
    album binary(128),
    track_number integer,
    realease binary(128)
);

CREATE TABLE artists (
    id binary(128),
    name varchar(255),
);

CREATE TABLE album (
    id binary(128),
    name varchar(255),
);

CREATE TABLE song_artists (
    song_id binary(128),
    artist_id binary(128),
);

CREATE TABLE artist_albums (
    artist_id binary(128),
    album_id binary(128),
);