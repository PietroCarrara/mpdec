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

    public load(view: View, container: HTMLElement) {
        this.removeChildrenFromContainer(container);

        container.appendChild(view.element);

        view.onLoad();
    }

    private removeChildrenFromContainer(container: HTMLElement) {
        // While there exists a child, remote
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}