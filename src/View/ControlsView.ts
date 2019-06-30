import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService"

export class ControlsView extends View {

    private playerService: MusicPlayerService;

    private currSongSpan: HTMLElement;

    constructor() {
        super('controlsView.html');

        this.playerService = MusicPlayerService.getInstance();

        this.currSongSpan = this.element.querySelector('#curr-song');

        this.playerService.onChangePlayer(() => this.onChangePlayer());
    }

    async onChangePlayer() {
        var song = await this.playerService.currentSong();

        this.currSongSpan.innerText = `${song.artist} - ${song.title}`;
    }

    onLoad(): void {

        this.onChangePlayer();
        
        this.element.querySelector('#next-song').addEventListener('click', () => {
            this.playerService.next();
        });

        this.element.querySelector('#prev-song').addEventListener('click', () => {
            this.playerService.prev();
        });
    }

    onShow(): void {
        alert('show!');
    }

    onHide(): void {
        alert('hide!');
    }
}