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
            console.log("Background started");
            // 1. イントオブザーバ
            console.log(this.observer);
            // 2. リクエストルータ
            console.log(this.requestRouter);
            // 3. メッセージルータ
            console.log(this.messageRouter);
        }
    }
}
