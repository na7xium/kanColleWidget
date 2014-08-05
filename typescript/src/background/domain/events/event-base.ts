/// <reference path="../../../common/infrastructure/notifier/notifier.ts" />
/// <reference path="../badge/badge.ts" />

module KCW {
    export class EventModel {
        constructor(public type:   string,
                    public id:     number,
                    public finish: number) {}
        public notify() {
            Notifier.notify({
                text:this.toText()
            });
        }
        private toText(): string {
            return "いえーい" + this.type + String(this.id);
        }
        public displayBadge() {
            var badge = new Badge(new Date(this.finish));
            badge.display();
        }
    }
}
