import * as os from 'os';
import * as fs from 'fs';

export class UserConfig {

    private static instance: UserConfig;

    /**
     * Absolute path where music is stored in the file system.
     * Should not include trailing '/'.
     *
     * @type {string}
     * @memberof UserConfig
     */
    public musicDir: string;

    private constructor() {

        var path = `${os.homedir()}/.config/mpdec`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        var json = '{}';
        if (fs.existsSync(`${path}/config.json`)) {
            json = fs.readFileSync(`${path}/config.json`).toString();
        }

        var data = JSON.parse(json);

        this.musicDir = data.musicDir;
    }

    public static getInstance() {
        if (!UserConfig.instance) {
            UserConfig.instance = new UserConfig();
        }

        return UserConfig.instance;
    }
}