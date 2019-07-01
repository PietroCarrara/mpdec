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

    protected escapeUri(uri: string) {
        return encodeURI(uri)
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, "\\)");
    }
}