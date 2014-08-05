/// <reference path="../domain/events/mission/mission-repo.ts" />
module KCW {
    // Observer
    // ローカルストレージに保存されている
    // 各種イベントの時間切れなどを監視し、
    // 適切なイベントを発火させる
    export class Observer {
        private durationMSec: number = 5000;
        private intervalId: number;
        private allEvents: EventModel[];
        private missionRepository = new MissionRepository();
        constructor() {}
        start(): number {
            this.intervalId = setInterval(() => {
                this.check();
            }, this.durationMSec);
            return this.intervalId;
        }
        private check() {
            this.restoreAllEvents();
            console.log("this.allEvents", this.allEvents);
        }
        private restoreAllEvents() {
            this.allEvents = [].concat(
                this.missionRepository.getAll()
            );
        }
    }
}
