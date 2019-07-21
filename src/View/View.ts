import { readFileSync } from "fs";

export abstract class View {

    public readonly element: HTMLElement;

    public abstract onLoad(): void;
    public abstract onShow(): void;
    public abstract onHide(): void;

    public constructor(file: string) {
        var html = readFileSync(__dirname + '/../../view/' + file);

        // Temporary element just to parse the html
        var el = document.createElement('div');
        el.innerHTML = html.toString();

        this.element = el.firstChild as HTMLElement;
    }

    /**
     * Opens a new view on top of the current one
     *
     * @param {View} view The new view to be shown
     * @memberof View
     */
    protected navigate(view: View) {

    }

    /**
     * Closes this view, and returns to the one below
     *
     * @memberof View
     */
    protected pop() {

    }

    /**
     * Hides this view
     *
     * @memberof View
     */
    public hide() {
        this.element.classList.add('hidden');
        this.onHide();
    }

    public show() {
        this.element.classList.remove('hidden');
        this.onShow();
    }

    protected fileUri(file: string) {
        var uri = encodeURI(file);

        return `"file://${uri}"`;
    }
}