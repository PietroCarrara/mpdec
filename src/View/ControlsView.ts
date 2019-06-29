import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService"

export class ControlsView extends View {

    private playerService = MusicPlayerService.getInstance();

    constructor() {
        super('controlsView.html');
    }

    onLoad(): void {
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