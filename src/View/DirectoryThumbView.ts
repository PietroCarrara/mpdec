import { Directory } from "../Model/Directory";
import { View } from "./View";

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

        var url = await this.directory.getThumbnail();
        this.mainContainer.style.background = `url(${url})`;

        this.mainContainer.onclick = () => {
            alert(url);
            console.log(url);
        };
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}