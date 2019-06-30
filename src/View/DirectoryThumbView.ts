import { Directory } from "../Model/Directory";
import { View } from "./View";

export class DirectoryThumbView extends View {

    private titleLabel: HTMLElement;

    private directory: Directory;
    
    constructor(dir: Directory) {
        super('directoryThumb.html');

        this.directory = dir;
    }

    public onLoad(): void {
        this.titleLabel = this.element.querySelector('#directory-title');

        this.titleLabel.innerText = this.directory.path;
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}