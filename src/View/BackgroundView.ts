import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";
import { FadingImage, DisplayStrategy } from "./FadingImage";
import { ViewService } from "../Services/ViewService";

export class BackgroundView extends View {

    private playerService = MusicPlayerService.getInstance();

    private viewService: ViewService = ViewService.getInstance();

    private background: FadingImage = new FadingImage(DisplayStrategy.Cover);

    constructor() {
        super('backgroundView.html');
    }

    private async onMusicChange() {
        var song = await this.playerService.currentSong();
        if (song) {
            var url = this.fileUri(await song.getArtOrDefault());
            url = `url(${url})`;

            this.background.setImage(url);
        }
    }

    public onLoad() : void {
        this.playerService.onChangePlayer(() => this.onMusicChange());

        this.viewService.load(this.background, this.element);

        this.onMusicChange();
    }

    public onShow(): void {
    }

    public onHide(): void {
    }
}