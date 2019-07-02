import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";

export class BackgroundView extends View {

    private playerService = MusicPlayerService.getInstance();

    private mainBackground: HTMLElement;
    private secondaryBackground: HTMLElement;

    private animationRunning: boolean;

    constructor() {
        super('backgroundView.html');
    }

    private async onMusicChange() {

        // Force the animation to end
        if (this.animationRunning) {
            this.onFinishAnimation();
        }
        
        var song = await this.playerService.currentSong();
        var url = this.fileUri(await song.getThumbnailOrDefault());
        url = `url(${url})`;

        if (this.mainBackground.style.backgroundImage ===  url) {
            return;
        }

        this.secondaryBackground.style.backgroundImage = url;
        this.secondaryBackground.style.opacity = `initial`;

        this.mainBackground.style.opacity = '0';

        this.animationRunning = true;
        setTimeout(() => {
            this.onFinishAnimation();
        }, 1000);
    }

    private onFinishAnimation() {

        // Don't do anything if the animation
        // wasn't running
        if (!this.animationRunning) {
            return;
        }
        
        var main = this.mainBackground;
        this.mainBackground = this.secondaryBackground;
        this.secondaryBackground = main;
        this.animationRunning = false;
    }

    public onLoad(): void {
        this.mainBackground = this.element.querySelector('#background-main');

        this.secondaryBackground = this.element.querySelector('#background-secondary');
        this.secondaryBackground.style.opacity = '0';

        this.playerService.onChangePlayer(() => this.onMusicChange());

        this.onMusicChange();
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }


}