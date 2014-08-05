module KCW.Notifier {
    export interface INotifyParams {
        text: string;
    }
    export function notify(params: INotifyParams) {
        window.alert(params.text);
    }
}