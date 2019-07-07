import { homedir } from "os";
import { existsSync, mkdirSync } from "fs";

export class CacheService {

    private static instance: CacheService;

    private cacheDir: string;

    private constructor() {
        this.cacheDir = `${homedir()}/.config/mpdec/cache`;

        if (!existsSync(this.cacheDir)) {
            mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    public static getInstance() {

        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }

        return CacheService.instance;
    }

    public file(dir: string, file: string) {

        mkdirSync(`${this.cacheDir}/${dir}`, {
            recursive: true
        });
        
        return `${this.cacheDir}/${dir}/${file}`;
    }
}