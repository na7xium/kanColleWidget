var KCW;
(function (KCW) {
    var Repository = (function () {
        function Repository(key, storage) {
            if (typeof storage === "undefined") { storage = null; }
            this.key = key;
            this.storage = window.localStorage;
            if (storage != null)
                this.storage = storage;
        }
        Repository.prototype.get = function () {
            return JSON.parse(this.storage.getItem(this.key));
        };
        Repository.prototype.set = function (val) {
            return this.storage.setItem(this.key, JSON.stringify(val));
        };
        return Repository;
    })();
    KCW.Repository = Repository;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var EventModel = (function () {
        function EventModel(type, id, finish) {
            this.type = type;
            this.id = id;
            this.finish = finish;
        }
        return EventModel;
    })();
    KCW.EventModel = EventModel;
})(KCW || (KCW = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KCW;
(function (KCW) {
    var Mission = (function (_super) {
        __extends(Mission, _super);
        function Mission(deckId, finish, info) {
            _super.call(this, "mission", deckId, finish);
            this.deckId = deckId;
            this.finish = finish;
            this.info = info;
        }
        return Mission;
    })(KCW.EventModel);
    KCW.Mission = Mission;
    var MissionInfo = (function () {
        function MissionInfo(missionId, title) {
            this.missionId = missionId;
            this.title = title;
        }
        return MissionInfo;
    })();
    KCW.MissionInfo = MissionInfo;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var MissionFactory = (function () {
        function MissionFactory() {
        }
        MissionFactory.create = function (stored) {
            return new KCW.Mission(stored["deck_id"], stored["finish"], (stored["info"]) ? new KCW.MissionInfo(1, stored["info"]["title"]) : null);
        };
        return MissionFactory;
    })();
    KCW.MissionFactory = MissionFactory;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var MissionRepository = (function (_super) {
        __extends(MissionRepository, _super);
        function MissionRepository() {
            _super.call(this, "missions");
        }
        MissionRepository.prototype.getAll = function () {
            return $.map(this.get(), function (stored) {
                return KCW.MissionFactory.create(stored);
            });
        };
        return MissionRepository;
    })(KCW.Repository);
    KCW.MissionRepository = MissionRepository;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var Observer = (function () {
        function Observer() {
            this.durationMSec = 5000;
            this.missionRepository = new KCW.MissionRepository();
        }
        Observer.prototype.start = function () {
            var _this = this;
            this.intervalId = setInterval(function () {
                _this.check();
            }, this.durationMSec);
            return this.intervalId;
        };
        Observer.prototype.check = function () {
            this.restoreAllEvents();
            console.log("this.allEvents", this.allEvents);
        };
        Observer.prototype.restoreAllEvents = function () {
            this.allEvents = [].concat(this.missionRepository.getAll());
        };
        return Observer;
    })();
    KCW.Observer = Observer;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var RequestRouter = (function () {
        function RequestRouter() {
        }
        return RequestRouter;
    })();
    KCW.RequestRouter = RequestRouter;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var MessageRouter = (function () {
        function MessageRouter() {
        }
        return MessageRouter;
    })();
    KCW.MessageRouter = MessageRouter;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var Background = (function () {
        function Background() {
            this.observer = new KCW.Observer();
            this.requestRouter = new KCW.RequestRouter();
            this.messageRouter = new KCW.MessageRouter();
        }
        Background.prototype.start = function () {
            this.observer.start();

            console.log(this.requestRouter);

            console.log(this.messageRouter);
        };
        return Background;
    })();
    KCW.Background = Background;
})(KCW || (KCW = {}));
var KCW;
(function (KCW) {
    var Controller = (function () {
        function Controller(params) {
            if (typeof params === "undefined") { params = {}; }
            this.params = params;
        }
        return Controller;
    })();
    KCW.Controller = Controller;
})(KCW || (KCW = {}));
