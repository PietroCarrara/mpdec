import { Directory as MpdDirectory } from 'mpc-js';
import { Song } from './Song';
import { MusicPlayerService } from '../Services/MusicPlayerService';
import { Assets } from './AssetsEnum';
import { UserConfig } from './UserConfig';
import { readdir } from 'fs';
import { promisify } from 'util';

const ls = promisify(readdir);

export class Directory {

    public static readonly root = new Directory({
        path: '/'
    });

    public readonly path: string;

    private contents: (Song | Directory)[];

    private constructor(info: any) {
        this.path = info.path;
    }

    public static fromPath(dir: string) {
        return new Directory({
            path: dir,
        });
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

    public async getThumbnailOrDefault() {
        var res = await this.getThumbnail();

        return res || Assets.NoPic;
    }

    public async getThumbnail(): Promise<string|null> {
        var userConfig = UserConfig.getInstance();
        var res: string;

        if (userConfig.musicDir) {
            var path = `${userConfig.musicDir}/${this.path}`;

            var contents = await ls(path);

            contents = contents.filter((file) => {
                var fileParts = file.toLowerCase().trim().split('.');
                var extension = fileParts[fileParts.length - 1];

                return [
                    'jpg',
                    'jpeg',
                    'png',
                    'bmp'
                ].includes(extension);
            });

            if (contents.length > 0) {
                res = `${path}/${contents[0]}`;
            }
        }

        if (!res) {
            var playerService = MusicPlayerService.getInstance();
            for (var content of await playerService.getContentsOf(this.path)) {
                if (content instanceof Directory) {
                    var thumb = await content.getThumbnail();
                    if (thumb) {
                        return thumb;
                    }
                }
            }

            return null;
        }

        return res;
    }
}