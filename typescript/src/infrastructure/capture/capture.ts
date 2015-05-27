/// <reference path="../../../definitions/chrome.d.ts" />
/// <reference path="../../../definitions/jquery.d.ts" />
module KCW.Infra {
    export class Capture {
        public static whole(windowId: number = null, opts: Object = null): JQueryPromise<string> {
            var d = $.Deferred();
            chrome.tabs.captureVisibleTab(windowId, opts || Capture.getOptions(), (imgURI: string) => {
                d.resolve(imgURI);
            });
            return d.promise();
        }
        private static getOptions(): Object {
            return {
                format: "png"
            };
        }
    }
}