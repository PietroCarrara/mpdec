import { View } from "./View";

export enum DisplayStrategy {
    Cover = 'cover',
    Contain = 'contain',
}

export class FadingImage extends View {

    private primaryImage: HTMLElement;
    private secondaryImage: HTMLElement;

    private animationRunning: boolean;

    private displayStrategy: DisplayStrategy;

    public constructor(displayStrategy: DisplayStrategy) {
        super('fadingImage.html');

        this.displayStrategy = displayStrategy;
    }

    public setImage(src: string) {
        // Force the animation to end        
        if (this.animationRunning) {
            this.onFinishAnimation();
        }

        if (this.primaryImage.style.backgroundImage === src) {
            return;
        }

        console.log(src, this.secondaryImage, this.secondaryImage.style);
        this.secondaryImage.style.backgroundImage = src;
        this.secondaryImage.style.opacity = 'initial';
        this.secondaryImage.style.backgroundSize = this.displayStrategy;

        this.primaryImage.style.opacity = '0';

        this.animationRunning = true;
        setTimeout(() => {
            this.onFinishAnimation();
        }, 1000);
    }

    public onLoad(): void {
        this.primaryImage = this.element.querySelector('#image-primary');

        this.secondaryImage = this.element.querySelector('#image-secondary');
        this.secondaryImage.style.opacity = '0';
    }

    private onFinishAnimation() {
        // Don't do anything if the animation
        // wasn't running
        if (!this.animationRunning) {
            return;
        }

        var main = this.primaryImage;
        this.primaryImage = this.secondaryImage;
        this.secondaryImage = main;
        this.animationRunning = false;
    }
        
    public onShow(): void {
        throw new Error("Method not implemented.");
    }
    
    public onHide(): void {
        throw new Error("Method not implemented.");
    }


}
