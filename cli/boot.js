/*global require*/
var fs = require('fs');
try {
    fs.statSync('src/js/AppConfig.js');
} catch (e) {
    if ('ENOENT' !== e.code) { throw e; }
    var data = [
        '/* jshint indent: 4 */',
        'var KanColleWidget = KanColleWidget || {};',
        'KanColleWidget.TwitterConfig = {',
        '    consumer_key:\'連携のテストをする場合は\',',
        '    consumer_secret:\'コンシューマキーなどをここに書く\'',
        '};',
        '// 詳しくは、README4DEV.mdを見て下さい'
    ].join('\n');
    fs.writeFileSync('src/js/AppConfig.js', data);
}
