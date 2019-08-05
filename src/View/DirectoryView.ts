import { View } from "./View";
import { Directory } from "../Model/Directory";
import { Song } from "../Model/Song";
import { ViewService } from "../Services/ViewService";
import { DirectoryThumbView } from "./DirectoryThumbView";
import { InputService } from "../Services/InputService";
import { AlertService } from "../Services/AlertService";

export class DirectoryView extends View {

    private directoryContainer: HTMLElement;

    private directory: Directory;

    private subDirectories: DirectoryThumbView[] = [];

    private searchString: string = '';

    public constructor(directory: Directory) {
        super('directoryView.html');

        this.directory = directory;
    }

    private async loadContents() {

        var contents = await this.directory.getContents();

        for (var c of contents) {

            if (c instanceof Song) {
                /** @todo Implement song selection */
            }

            if (c instanceof Directory) {
                var viewService = ViewService.getInstance();
                var dirThumbView = new DirectoryThumbView(c);

                this.subDirectories.push(dirThumbView);
                viewService.load(dirThumbView, this.directoryContainer);
            }
        }
    }

    private handleSearchKey(key: string) {
        var alertService = AlertService.getInstance();

        if (key.length === 1) {
            this.searchString += key.toUpperCase();
            alertService.alert(this.searchString);
        } else {
            switch (key) {
                case 'Backspace':
                    this.searchString = this.searchString.substring(0, this.searchString.length - 1);
                    alertService.alert(this.searchString);
                    break;
                case 'Escape':
                    this.searchString = '';
                    break;
            }
        }
    }

    private filterAlbums() {
        for (var dirThumb of this.subDirectories) {
            var path = dirThumb.getDirectory().path;

            if (!path.toUpperCase().includes(this.searchString)) {
                dirThumb.hide();
            } else {
                dirThumb.show();
            }
        }
    }

    private onKeyDown(key: string) {
        this.handleSearchKey(key);
        this.filterAlbums();
        /** @todo this.filterSongs() */
    }

    public onLoad(): void {
        this.directoryContainer = this.element.querySelector('#directory-container');

        this.loadContents();

        var inputService = InputService.getInstance();
        inputService.addKeyDownEventListener((e) => {
            this.onKeyDown(e)
        });
    }

    public onShow(): void {
    }

    public onHide(): void {
    }
}