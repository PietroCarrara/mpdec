import { spawn } from "child_process";
import { MusicPlayerService } from "./MusicPlayerService";
import { Song } from "../Model/Song";

export class NotificationService {

    private static instance: NotificationService;

    private playerService: MusicPlayerService;

    private lastSong: Song;
    
    private constructor(){
    }

    public static getInstance() {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        
        return NotificationService.instance;
    }

    public bootstrap() {
        this.playerService = MusicPlayerService.getInstance();

        this.playerService.onChangePlayer(async () => {

            var currentSong = await this.playerService.currentSong();
            if (this.lastSong == null || !this.lastSong.equals(currentSong)) {
                this.notifyPlaying(currentSong);
            }
            this.lastSong = currentSong;
        });
    }

    public notify(title: string, subtitle: string, message: string, image?: string) {

        var args = ['-a', title, subtitle, message];

        if (image) {
            args.push('-i', image);
        }
        
        spawn('notify-send', args);
    }

    public async notifyPlaying(song: Song) {
        this.notify(
            'Now Playing',
            song.title,
            song.artist,
            await song.getThumbnailOrDefault(),
        );
    }

    public onMusicChange() {
        
    }
}