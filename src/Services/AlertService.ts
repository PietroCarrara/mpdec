export class AlertService {

    private static instance: AlertService;

    private readonly element: HTMLElement;

    private timeout: NodeJS.Timeout;

    private constructor() {
        this.element = document.querySelector('#alert-container > div');
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AlertService();
        }

        return this.instance;
    }

    public async alert(msg: string) {
        this.element.innerText = msg;

        this.removeAnimation();

        clearTimeout(this.timeout);
        this.timeout = setTimeout(
            () => this.addAnimation(),
            500
        );
    }

    private addAnimation() {
        console.log('addAnimation');
        this.element.classList.add('fadeout-animation');
    }

    private removeAnimation() {
        console.log('removeAnimation');
        this.element.classList.remove('fadeout-animation');
    }
}