import { Song as MpdSong, PlaylistItem } from 'mpc-js';

export class Song {

    public readonly artist: string;
    public readonly title: string;
    public readonly album: string;
    public readonly path: string;
    public readonly track: number;
    public readonly disc: number;

    private constructor(data: any) {
        this.artist = data.artist;
        this.title = data.title;
        this.album = data.album;
        this.path = data.path;
        this.track = data.track;
        this.disc = data.disc;
    }

    public static fromMpdSong(mpdSong: MpdSong) {
        var song = new Song({
            artist: mpdSong.artist,
            title: mpdSong.title,
            album: mpdSong.album,
            path: mpdSong.path,
            track: Number.parseInt(mpdSong.track),
            disc: Number.parseInt(mpdSong.disc),
        });

        return song;
    }

    public static fromMpdPlaylist(mpdSong: PlaylistItem) {

        var song = new Song({
            artist:  mpdSong.artist,
            title: mpdSong.title,
            album: mpdSong.album,
            path: mpdSong.path,
        });

        return song;
    }
}