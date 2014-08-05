
module KCW.Notifier {
    export interface IEventToNotify {
    }
    export function notifyAllEvents(events: IEventToNotify[]) {
        if (! events.length) return;
        console.log(events);
        window.alert("いえーい");
    }
    function notifyEvent(event: IEventToNotify) {

    }
    export function notifyByMessage(message: string) {

    }
}