INSERT INTO songs (id, name, track, album)
VALUES 
    ('1', 'Test Song #1', 1, '1'),
    ('2', 'Test Song #2', 1, '1'),
    ('3', 'Test Song #3', 1, '1'),
    ('4', 'Test Song #4', 1, '1'),
    ('5', 'Test Song #5', 1, '1'),
    ('6', 'Test Song #6', 1, '1'),
    ('7', 'Test Song #7', 1, '1'),
    ('8', 'Test Song #1', 1, '1'),
    ('9', 'Test Song #1', 1, '1'),
    ('10', 'Test Song #1', 1, '1'),
    ('11', 'Test Song #1', 1, '1'),
    ('12', 'Test Song #1', 1, '1'),
    ('13', 'Test Song #1', 1, '1'),
    ('14', 'Test Song #1', 1, '1'),
    ('15', 'Test Song #1', 1, '1'),
    ('16', 'Test Song #1', 1, '1'),
    ('17', 'Test Song #1', 1, '1'),
    ('18', 'Test Song #1', 1, '1'),
    ('19', 'Test Song #1', 1, '1'),
    ('20', 'Test Song #1', 1, '1');

INSERT INTO artists (id, name)
VALUES 
    ('1', 'Artist #1'),
    ('2', 'Artist #2'),
    ('3', 'Artist #3'),
    ('4', 'Artist #4'),
    ('5', 'Artist #5');

INSERT INTO albums (id, name)
VALUES 
    ('1', 'Album #1'),
    ('2', 'Album #2'),
    ('3', 'Album #3'),
    ('4', 'Album #4'),
    ('5', 'Album #5');

INSERT INTO songs_artists (song_id, artist_id)
VALUES 
    ('1', '1'),
    ('2', '1'),
    ('3', '1'),
    ('4', '1'),
    ('5', '1'),
    ('6', '1'),
    ('7', '1'),
    ('8', '1'),
    ('9', '1'),
    ('10', '1'),
    ('11', '1'),
    ('12', '1'),
    ('13', '1'),
    ('14', '1'),
    ('15', '1'),
    ('16', '1'),
    ('17', '1'),
    ('18', '1'),
    ('19', '1'),
    ('20', '1');

INSERT INTO artists_albums (artist_id, album_id)
VALUES 
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5');