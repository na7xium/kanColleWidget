/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="./controllers/controller.ts" />
/// <reference path="./controllers/message-controller.ts" />
module KCW {
    export interface KCWMessage {
        purpose: string;
    }
    export class MessageRouter {
        private suffix: string = "MessageController";
        constructor() {}
        public listen() {
            chrome.runtime.onMessage.addListener((message: KCWMessage, sender: any, sendRes: any) => {
                this.listener(message, sender, sendRes);
            });
        }
        private listener(message: KCWMessage, sender: any, sendRes: Function) {
            this.resolve(message, sendRes).done((controller: MessageController) => {
                controller.process().fail(() => { console.log("TODO: ErrorLogger", message); });
            });
        }
        private resolve(message: KCWMessage, sendRes: Function): JQueryPromise<MessageController> {
            var deferred = $.Deferred();
            var controllerName = this.getName(message.purpose);
            console.log(controllerName);
            if (KCW[controllerName]) return deferred.resolve(new KCW[controllerName](sendRes, message));
            return deferred.reject();
        }
        private getName(purpose: string): string {
            var name = purpose[0].toUpperCase() + purpose.slice(1);
            return name + "MessageController";
        }
    }
}
