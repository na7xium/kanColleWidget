/// <reference path="./controller.ts" />
module KCW {
    export class MessageController extends Controller{
        constructor(public sendRes: Function, params: any = {}) {
            super(params);
        }
    }
}
