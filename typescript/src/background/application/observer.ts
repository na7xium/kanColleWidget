/// <reference path="../domain/events/mission/mission-repo.ts" />
module KCW {
    export class Observer {
        private durationMSec: number = 5000;
        private intervalId: number;
        private allEvents: EventModel[];
        private timeUpEvents: EventModel[];
        private nearestEndEvent: EventModel;
        private missionRepository = new MissionRepository();
        start(): number {
            this.intervalId = setInterval(() => {
                this.check();
            }, this.durationMSec);
            return this.intervalId;
        }
        private check() {
            this.restoreAllEvents();
            this.detectTimeUpEvents();
            this.detectNearestEndEvent();
            this.notifyTimeUp();
            this.displayNearest();
        }
        private restoreAllEvents() {
            this.allEvents = [].concat(
                this.missionRepository.getAll()
            ).sort((former: EventModel, latter: EventModel) => {
                if (former.finish > latter.finish) return 1;
                return -1;
            });
        }
        private detectTimeUpEvents() {
            this.timeUpEvents = $.map(this.allEvents,(event: EventModel) => {
                if (event.finish < Date.now()) return event;
            });
        }
        private detectNearestEndEvent() {
            this.nearestEndEvent = $.map(this.allEvents, (event: EventModel) => {
                if (event.finish > Date.now()) return event;
            }).shift();
        }
        private notifyTimeUp() {
            $.map(this.timeUpEvents, (event: EventModel) => { event.notify(); });
        }
        private displayNearest() {
            if (this.nearestEndEvent) this.nearestEndEvent.displayBadge();
        }
    }
}
