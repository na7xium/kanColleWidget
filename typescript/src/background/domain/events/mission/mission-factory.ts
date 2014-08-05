/// <reference path="./mission.ts" />
module KCW {
    export class MissionFactory {
        public static create(stored: Object): Mission {
            return new Mission(
                stored["deck_id"],
                stored["finish"],
                (stored["info"]) ? new MissionInfo(
                    1,//無いのでハード
                    stored["info"]["title"]
                ) : null
            );
        }
    }
}
