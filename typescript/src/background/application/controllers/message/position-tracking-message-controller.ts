/// <reference path="../message-controller.ts" />
module KCW {
    export class PositionTrackingMessageController extends MessageController {
        validate(): JQueryPromise {
            return this.validation.resolve();
        }
        main(): JQueryPromise {
            console.log("ここでTracking.set");
            return this.result.resolve();
        }
    }
}