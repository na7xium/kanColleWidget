/*global process, require*/
var execSync = require('child_process').execSync;
if (process.platform === 'win32') {
    process.stdout.write(
        require('iconv-lite').decode(
            execSync('dir /O:EG'), // 拡張子＋グループ順にソート
            'Shift_JIS'
        )
    );
} else {
    process.stdout.write(execSync('ls'));
}
