import { Song as MpdSong, PlaylistItem } from 'mpc-js';
import { dirname } from 'path';
import { MusicPlayerService } from '../Services/MusicPlayerService';
import { Directory } from './Directory';

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

        var fileParts = this.path.split('/');
        var filename = fileParts[fileParts.length - 1];

        if (!this.artist || this.artist === '') {
            this.artist = filename.split('-')[0].trim();
        }

        if (!this.title || this.title === '') {
            var albumParts = filename.split('-');
            if (albumParts.length > 1) {
                this.title = albumParts.slice(1).join().trim();
            }
        }
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

    public equals(s: Song) {
        return this.path === s.path;
    }

    public async getThumbnailOrDefault() {
        var dir = dirname(this.path);

        console.log(dir);

        var directory = Directory.fromPath(dir);

        console.log(await directory.getContents());

        return directory.getThumbnailOrDefault();
    }
}