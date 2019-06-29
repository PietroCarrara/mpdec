import { MPC } from 'mpc-js';
import { EventEmitter } from 'events';
import { Song } from '../Model/Song';

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