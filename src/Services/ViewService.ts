import { View } from "../View/View";

export class ViewService {

    private static instance: ViewService;

    private constructor() {
    }

    public static getInstance() {
        if (!ViewService.instance) {
            ViewService.instance = new ViewService();
        }

        return ViewService.instance;
    }

    public load(view: View, container: Element) {
        container.appendChild(view.element);
        view.onLoad();

        view.show();
    }
}