import { readFileSync } from "fs";

export abstract class View {

    public readonly element: HTMLElement;

    public abstract onLoad(): void;
    public abstract onShow(): void;
    public abstract onHide(): void;

    public constructor(file: string) {
        var html = readFileSync(__dirname + '/../../view/' + file);
        this.element = document.createElement('div');
        this.element.innerHTML = html.toString();
    }

    /**
     * Opens a new view on top of the current one
     *
     * @param {View} view
     * @memberof View
     */
    public navigate(view: View) {
        
    }

    /**
     * Closes this view, and returns to the one below
     *
     * @memberof View
     */
    public pop() {

    }
}