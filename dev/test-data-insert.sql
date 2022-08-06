INSERT INTO songs (id, name, track, album)
VALUES 
    (1, 'Dramatic', 1, 1),
    (2, 'poison control', 1, 2);

INSERT INTO artists (id, name)
VALUES 
    (1, 'Makaih Beats'),
    (2, 'kaleidoplosm');

INSERT INTO albums (id, name)
VALUES 
    (1, 'Dramatic'),
    (2, 'poison control');

INSERT INTO songs_artists (song_id, artist_id)
VALUES 
    (1, 1),
    (2, 2);

INSERT INTO artists_albums (artist_id, album_id)
VALUES 
    (1, 1),
    (2, 2);