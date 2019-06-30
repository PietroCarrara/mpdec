import { Directory } from "../Model/Directory";
import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";

export class DirectoryThumbView extends View {

    private titleLabel: HTMLElement;
    private mainContainer: HTMLElement;

    private directory: Directory;

    constructor(dir: Directory) {
        super('directoryThumb.html');

        this.directory = dir;
    }

    public async onLoad() {
        this.titleLabel = this.element.querySelector('#directory-title');
        this.mainContainer = this.element;

        this.titleLabel.innerText = this.directory.path;

        var url = await this.directory.getThumbnailOrDefault();
        url = encodeURI(url)
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, "\\)");

        this.mainContainer.style.background = `url(file://${url})`;

        this.mainContainer.onclick = async () => {
            var playerService = MusicPlayerService.getInstance();

            await playerService.clearPlaylist();
            await playerService.addToPlaylist(this.directory);
            playerService.play();
        }
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}