import {Song as MpdSong, PlaylistItem} from 'mpc-js';

export class Song {

    private artist: string;
    private title: string;
    private album: string;
    private track: number;
    private disc: number;

    private constructor() {
    }

    public static fromMpdSong(mpdSong: MpdSong) {
        if (!mpdSong.isFile()) {
            throw new Error('A MPD song must be a single file!');
        }
        
        var song = new Song();
        
        song.artist = mpdSong.artist;
        song.title = mpdSong.title;
        song.album = mpdSong.album;
        song.track = Number.parseInt(mpdSong.track);
        song.disc = Number.parseInt(mpdSong.disc);

        return song;
    }

    public static fromMpdPlaylist(mpdSong: PlaylistItem) {
        
        var song = new Song();
        
        song.artist = mpdSong.artist;
        song.title = mpdSong.title;
        song.album = mpdSong.album;

        return song;
    }

    public getArtist(): string {
        return this.artist;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAlbum(): string {
        return this.album;
    }

    public getTrack(): number {
        return this.track;
    }

    public getDisc(): number {
        return this.disc;
    }

}