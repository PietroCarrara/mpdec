import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";
import { PlaybackState } from "../Model/PlaybackStateEnum";
import { ViewService } from "../Services/ViewService";
import { FadingImage, DisplayStrategy } from "./FadingImage";

export class BottomInfoView extends View {

    private viewService: ViewService = ViewService.getInstance();

    private artistLabel: HTMLElement;
    private titleLabel: HTMLElement;
    private albumLabel: HTMLElement;

    private prevSongButton: HTMLElement;
    private nextSongButton: HTMLElement;
    private stateToggleButton: HTMLElement;
    private stateIcon: HTMLElement;

    private albumImage: FadingImage = new FadingImage(DisplayStrategy.Contain);

    private playerService: MusicPlayerService;

    constructor() {
        super('bottomInfoView.html');

        this.playerService = MusicPlayerService.getInstance();
        this.playerService.onChangePlayer(() => this.onChangePlayer());
        this.onChangePlayer();
    }

    private async onChangePlayer() {

        if (await this.playerService.getPlaybackState() === PlaybackState.Playing) {
            this.stateIcon.innerText = 'pause';
        } else {
            this.stateIcon.innerText = 'play_arrow';
        }

        var song = await this.playerService.currentSong();
        if (song) {
            this.titleLabel.innerText = song.title;
            this.albumLabel.innerText = song.album;
            this.artistLabel.innerText = song.artist;

            var url = await song.getThumbnailOrDefault();
            url = `url(${url})`;
            this.albumImage.setImage(url);
        }
    }

    public onLoad(): void {
        this.artistLabel = this.element.querySelector('#info-artist');
        this.titleLabel = this.element.querySelector('#info-title');
        this.albumLabel = this.element.querySelector('#info-album');

        this.prevSongButton = this.element.querySelector('#controls-prev');
        this.nextSongButton = this.element.querySelector('#controls-next');
        this.stateToggleButton = this.element.querySelector('#controls-state');
        this.stateIcon = this.element.querySelector('#state-icon');

        var albumDiv = this.element.querySelector('#album-image-container');
        this.viewService.load(this.albumImage, albumDiv);

        this.prevSongButton.onclick = () => this.playerService.prev();
        this.nextSongButton.onclick = () => this.playerService.next();
        this.stateToggleButton.onclick = () => this.playerService.togglePlaybackState();
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}