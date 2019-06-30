import { View } from "./View";
import { Directory } from "../Model/Directory";
import { Song } from "../Model/Song";
import { ViewService } from "../Services/ViewService";
import { DirectoryThumbView } from "./DirectoryThumbView";

export class DirectoryView extends View {

    private directoryContainer: HTMLElement;
    
    private directory: Directory;
    private loaded: boolean;

    public constructor(directory: Directory) {
        super('directoryView.html');

        this.directory = directory;
    }

    private async showContents() {

        var contents = await this.directory.getContents();

        for (var c of contents) {
            
            if (c instanceof Song) {

            }

            if (c instanceof Directory) {
                var viewService = ViewService.getInstance();
                var dirThumbView = new DirectoryThumbView(c);

                viewService.load(dirThumbView, this.directoryContainer);
            }
        }
    }
    
    public onLoad(): void {
        this.loaded = true;

        this.directoryContainer = this.element.querySelector('#directory-container');

        this.showContents();
    }

    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}