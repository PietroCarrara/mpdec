import { MPC, Song as MpdSong, Playlist, Directory as MpdDirectory } from 'mpc-js';
import { EventEmitter } from 'events';
import { Song } from '../Model/Song';
import { PlaybackState } from '../Model/PlaybackStateEnum';
import { Directory } from '../Model/Directory';

export class MusicPlayerService {

    private static instance: MusicPlayerService;

    private eventEmitter = new EventEmitter();

    private mpc: MPC;

    private constructor() {
        this.mpc = new MPC();
        this.mpc.connectTCP('localhost', 6600);

        this.mpc.on('changed-player', () => {
            this.eventEmitter.emit('changed-player');
        });
    }

    public static getInstance(): MusicPlayerService {
        if (!MusicPlayerService.instance) {
            MusicPlayerService.instance = new MusicPlayerService();
        }

        return MusicPlayerService.instance;
    }

    public onChangePlayer(callback: VoidFunction) {
        this.eventEmitter.on('changed-player', callback);
    }

    public async getPlaybackState() {
        var status = await this.mpc.status.status();
        
        return status.state;
    }

    public async getContentsOf(where = '/') {
        var contents = await this.mpc.database.listInfo(where);

        var res: (Song|Directory)[] = [];

        for (var c of contents) {
            
            if (c instanceof MpdSong) res.push(Song.fromMpdSong(c));
            if (c instanceof MpdDirectory) res.push(Directory.fromMpdDirectory(c));
            // if (c instanceof Playlist) ;
        }

        return res;
    }

    public async togglePlaybackState() {

        var state = await this.getPlaybackState();

        if (state != PlaybackState.Playing) {
            this.mpc.playback.play();
        } else {
            this.mpc.playback.pause();
        }
    }
    
    public async currentSong() {
        return Song.fromMpdPlaylist(await this.mpc.status.currentSong());
    }

    public async next() {
        this.mpc.playback.next();
    }

    public async prev() {
        this.mpc.playback.previous();
    }
}