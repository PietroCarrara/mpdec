import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";

export class BottomInfoView extends View {

    private artistLabel: HTMLElement;
    private titleLabel: HTMLElement;
    private albumLabel: HTMLElement;

    private playerService: MusicPlayerService;

    constructor() {
        super('bottomInfoView.html');

        this.playerService = MusicPlayerService.getInstance();
        this.playerService.onChangePlayer(() => this.onChangePlayer());
        this.onChangePlayer();
    }

    private async onChangePlayer() {
        var song = await this.playerService.currentSong();

        this.artistLabel.innerText = song.getArtist();
        this.titleLabel.innerText = song.getTitle();
        this.albumLabel.innerText = song.getAlbum();
    }

    public onLoad(): void {
        this.artistLabel = this.element.querySelector('#info-artist');
        this.titleLabel = this.element.querySelector('#info-title');
        this.albumLabel = this.element.querySelector('#info-album');
    }
    
    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}