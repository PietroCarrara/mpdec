export class MusicPlayerService {

    private static instance: MusicPlayerService;

    private constructor() {

    }

    public static getInstance(): MusicPlayerService {
        if (!MusicPlayerService.instance) {
            MusicPlayerService.instance = new MusicPlayerService();
        }

        return MusicPlayerService.instance;
    }

    public next() {
        alert('next');
    }

    public prev() {
        alert('prev');
    }
}