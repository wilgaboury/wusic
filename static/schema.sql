CREATE TABLE IF NOT EXISTS songs (
    id TEXT PRIMARY KEY,
    name TEXT,
    track INTEGER,
    album TEXT
    -- FOREIGN KEY (album) REFERENCES albums (id)
);

CREATE TABLE IF NOT EXISTS artists (
    id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS albums (
    id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS songs_artists (
    song_id TEXT,
    artist_id TEXT,
    -- FOREIGN KEY (song_id) REFERENCES songs (id),
    -- FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE IF NOT EXISTS artists_albums (
    artist_id TEXT,
    album_id TEXT,
    UNIQUE(artist_id),
    UNIQUE(album_id)
    -- FOREIGN KEY (artist_id) REFERENCES artists (id),
    -- FOREIGN KEY (album_id) REFERENCES albums (id)
);

CREATE TABLE IF NOT EXISTS playlists (
    id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS playlist_items (
    playlist_id TEXT,
    id TEXT,
    type TEXT,
    track INTEGER
);

