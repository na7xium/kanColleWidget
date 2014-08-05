/// <reference path="../../../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../../common/domain/repository.ts" />
/// <reference path="./mission-factory.ts" />
/// <reference path="./mission.ts" />
module KCW {
    export class MissionRepository extends Repository {
        constructor() {
            super("missions");
        }
        getAll(): Mission[] {
            return $.map(this.get(), (stored) => {
                return MissionFactory.create(stored);
            });
        }
    }
}
