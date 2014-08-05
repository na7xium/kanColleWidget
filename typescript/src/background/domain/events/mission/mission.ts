/// <reference path="../event-base.ts" />
module KCW {
    export class Mission extends EventModel {
        constructor(public deckId: number, public finish: number, public info?: MissionInfo) {
            super("mission", deckId, finish);
        }
    }
    export class MissionInfo {
        constructor(public missionId: number, public title: string) {}
    }
}
