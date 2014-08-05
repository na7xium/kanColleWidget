/// <reference path="./observer.ts" />
/// <reference path="./request-router.ts" />
/// <reference path="./message-router.ts" />
module KCW {
    // backgroundアプリケーションの定義
    export class Background {
        private observer: Observer = new Observer();
        private requestRouter: RequestRouter = new RequestRouter();
        private messageRouter: MessageRouter = new MessageRouter();
        constructor() {}
        public start() {
            // 1. イントオブザーバ
            this.observer.start();
            // 2. リクエストルータ
            console.log(this.requestRouter);
            // 3. メッセージルータ
            console.log(this.messageRouter);
        }
    }
}
