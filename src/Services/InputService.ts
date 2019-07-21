export class InputService {

    private static instance: InputService;

    private onKeyDownEventHandler: ((e: string) => void)[];

    private constructor() {
        this.onKeyDownEventHandler = [];

        document.addEventListener('keydown', (e) => {
            this.onKeyDown(e);
        });
    }

    public static getInstance() {

        if (!this.instance) {
            this.instance = new InputService();
        }

        return this.instance;
    }

    public addKeyDownEventListener(callback: (e: string) => void) {
        this.onKeyDownEventHandler.push(callback);
    }

    private onKeyDown(event: KeyboardEvent) {
        for (var handler of this.onKeyDownEventHandler) {
            handler(event.key);
        }
    }
}