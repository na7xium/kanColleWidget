/* jshint indent: 4 */
var widgetPages = widgetPages || {};
(function() {
    'use strict';
    var CaptureFilenamePrefixView = widgetPages.CaptureFilenamePrefixView = function(){
        this.inputName = 'capture-image-filename-prefix';
        this.title = "スクショのファイル名プレフィックス";
        this.description = '{ここで設定した文字}_{日付}_{時間}.jpegとかになります';
    };
    Util.extend(CaptureFilenamePrefixView, widgetPages.SettingTextView);
    CaptureFilenamePrefixView.prototype.validate = function(val){
        if (/[(\\|/|:|\*|?|\"|<|>|\|)]/.test(val)) {
            return "\\ / : * ? \" ' < > | 、このへんの文字列はファイル名に使えないっぽい？";
        }
        return true;
    };
})();
