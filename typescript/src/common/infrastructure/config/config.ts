/// <reference path="../../../../definitions/jquery/jquery.d.ts" />
module KCW.Config {
    var _key: string = "config";
    var _storage: Storage = window.localStorage;
    function getAll(): Object {
        var stored = JSON.parse(_storage.getItem(_key));
        return $.extend({}, _initial, stored);
    }
    function saveAll(toStore: Object) {
        return _storage.setItem(_key, JSON.stringify(toStore));
    }
    export function get(key: string): any {
        return getAll()[key];
    }
    export function set(key: string, val: any) {
        var stored = getAll();
        stored[key] = val;
        return saveAll(stored);
    }
    // 歴史を感じる
    var _initial: Object = {
        'announce-already-read'              : 0,
        'badge-left-time'                    : true,
        'record-achievements'                : false,
        //'enable-manual-reminder'           : false, //Obsolete!!
        'enable-dynamic-reminder'            : false,
        'popup-select-title'                 : '',
        'notification-img-file'              : '',
        'notification-sound-file'            : '',
        'notification-sound-volume'          : '100',
        'notification-mission-end-suffix'    : '',
        'notification-nyukyo-end-suffix'     : '',
        'notification-createship-end-suffix' : '',
        //'enable-notification'              : false, // Obsolete!!
        'notification-on-reminder-set'       : true,
        'notification-on-reminder-finish'    : true,
        'notification-offset-millisec'       : 60*1000,//デフォルトでは1分前
        'enable-screen-shot'                 : false,
        'capture-destination-size'           : true, // とりあえず今はbool
        'capture-image-format'               : 'jpeg',
        'capture-image-filename-prefix'      : 'kancolle',
        'capture-image-download-dir'         : '艦これ',
        'launch-on-click-notification'       : true,
        'show-clockmode-button'              : true,
        'download-on-screenshot'             : false,
        'notification-stay-visible'          : '',
        'enable-mission-reminder'            : true,
        'dynamic-reminder-type'              : 0,
        'allow-ocr-result-log'               : false,
        'share-kousyo-result'                : false,
        'tiredness-recovery-minutes'         : 0,
        'prevent-forgetting-quest'           : true,
        'display-maintenance-info'           : false,
        'clockmode-style'                    : 1,
        'timer-format-remained-time'         : false,
        'show-ships-status'                  : false,
        'show-old-launch'                    : true,//でも基本的にはこれはfalseを期待
        'text-on-mission-start'              : 'ふなでだぞー',
        'modify-original-tab'                : false,
        'use-white-mode-as-default'          : false,
        'hide-adressbar-in-safemode'         : false,
        'enable-sync'                        : false,// Obsolete!!
        'sync-save-type'                     : 0,
        'auth-twitter'                       : false,
        'twitter-screen-name'                : "",
        'tweet-hashtag'                      : "",
        'enable-twitter-remind'              : false,// Obsolete!!
        'enable-twitter-remind-mission'      : false,
        'enable-twitter-remind-nyukyo'       : false,
        'enable-twitter-remind-createship'   : false,
        'enable-twitter-remind-confirm'      : false,
        'enable-twitter-remind-mission'      : false,
        'sort-by-finishtime'                 : false
    }
}