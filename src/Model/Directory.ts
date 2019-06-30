import {Directory as MpdDirectory} from 'mpc-js';
import { Song } from './Song';
import { MusicPlayerService } from '../Services/MusicPlayerService';

export class Directory {

    public readonly path: string;

    private contents: (Song|Directory)[];
    
    private constructor(info: any) {
        this.path = info.path;
    }

    public static fromMpdDirectory(dir: MpdDirectory) {

        var directory = new Directory({
            path: dir.path,
        });

        return directory;
    }

    public async getContents() {
        if (!this.contents) {
            var playerService = MusicPlayerService.getInstance();
            this.contents = await playerService.getContentsOf(this.path);
        }
        
        return this.contents;
    }
}