import { CacheService } from "./CacheService";
import { fstatSync, existsSync, openSync } from "fs";
import Sharp = require("sharp");

export class ThumbnailCacheService {

    private static instance: ThumbnailCacheService;

    private constructor() {
    }

    public static getInstance() {
        if (!ThumbnailCacheService.instance) {
            ThumbnailCacheService.instance = new ThumbnailCacheService();
        }

        return ThumbnailCacheService.instance;
    }

    /**
     * Returns the thumbnail for a file.
     */
    public async getThumbnailForFile(file: string) {

        var cache = CacheService.getInstance();

        var success = true;

        var hash = this.hashString(file);
        var filename = Number(hash).toString(16) + '.jpg';
        filename = cache.file('thumbs', filename);

        if (!existsSync(filename)) {
            success = await this.generateThumbnailForFile(file, filename);
        } else {
            var thumbStat = fstatSync(openSync(filename, 'r'));
            var fileStat = fstatSync(openSync(file, 'r'));

            if (fileStat.mtime > thumbStat.mtime) {
                success = await this.generateThumbnailForFile(file, filename);
            }
        }

        if (success) {
            return filename;
        }
        
        return null;
    }

    private async generateThumbnailForFile(file: string, output: string) {
        return await Sharp(file)
        .resize(256, 256, {
            fit: 'inside'
        })
        .toFile(output)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
    }

    /**
     * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
     */
    private hashString(str: string) {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}