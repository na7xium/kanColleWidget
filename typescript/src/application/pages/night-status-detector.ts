
module KCW {
    export class NightStatusDetector {
        private static instances: NightStatusDetector[] = [];
        private static intervalDuration: number = 1000;
        public id: number;
        private targetWinId: number;
        constructor() {}
        private static newInstance(): NightStatusDetector {
            var instance = new this();
            NightStatusDetector.instances.push(instance);
            return instance;
        }
        private static killAll() {
            for (var i = 0, l = NightStatusDetector.instances.length; i < l; i++) {
                clearInterval(NightStatusDetector.instances[i].id);
                NightStatusDetector.instances.shift();
            }
        }
        public static start() {
            var instance = NightStatusDetector.newInstance();
            instance.startInterval();
        }
        public static kill() {
            NightStatusDetector.killAll();
        }
        private startInterval() {
            this.id = setInterval(() => {
                if (this.targetWinId) {
                    Infra.Capture.whole(this.targetWinId, {format: 'jpeg', quality: 1}).done((imgURI: string) => {
                        console.log("captured!!", imgURI);
                    });
                } else {
                    console.log("ないから");
                    WindowFinder.findKCWidget().done((win:chrome.windows.Window) => {
                        this.targetWinId = win.id;
                        Infra.Capture.whole(win.id, {format: 'jpeg', quality: 1}).done((imgURI:string) => {
                            console.log("captured!!", imgURI);
                        });
                    });
                }
            }, NightStatusDetector.intervalDuration);
        }
    }
}