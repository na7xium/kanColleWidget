/*jshint camelcase: false*/
/*global console, process, require*/
var fs = require('fs-extra');
var path = require('path');
var print = console.log.bind(console);

var getFileList = function (dir, list) {
    'use strict';
    if (!list) { list = []; }
    fs.readdirSync(dir).forEach(function (ent) {
        ent = path.join(dir, ent);
        var stat = fs.statSync(ent);
        if (stat.isFile()) {
            list.push(ent);
        } else {
            getFileList(ent, list);
        }
    });
    return list;
};

var createZipFile = function (sourceDir, outputFile) {
    'use strict';
    var zip = new require('node-zip')();
    getFileList(sourceDir).forEach(function (file) {
        zip.file(path.relative(sourceDir, file), fs.readFileSync(file), {binary: true});
    });
    var content = zip.generate({
        compression: 'DEFLATE',
        compressionOptions : { level: 9 },
        type: 'nodebuffer',
        mimeType: 'application/zip'
    });
    fs.writeFileSync(outputFile, content);
};

var print_help = function () {
    'use strict';
    print('\ttest\tテスト用ビルド');
    print('\tstg\tステージングビルド');
    print('\tprod\tプロダクションビルド');
    print('\tbeta\tベータ版ビルド');
    print('\tall\tぜんぶ');
    print('\tなし\tぜんぶ');
    print('');
    print('\tversion\tバージョン情報チェック');
    print('\thelp\tこれです');
    process.exit(0);
};

var build_prod = function () {
    'use strict';
    fs.removeSync('build/kanColleWidget');
    fs.mkdirpSync('build/kanColleWidget');
    fs.copySync('src', 'build/kanColleWidget/src');
    fs.copySync('chrome_ex_oauth.html', 'build/kanColleWidget/chrome_ex_oauth.html');

    fs.readdirSync('build/kanColleWidget/src/img').forEach(function (filename) {
        if (!/^icon.*\.png$/.test(filename)) { return; }
        var file = 'build/kanColleWidget/src/img/' + filename;
        fs.copySync(file, 'build/kanColleWidget/' + filename);
        fs.removeSync(file);
    });

    fs.copySync('manifest/prod.json', 'build/kanColleWidget/manifest.json');

    createZipFile('build/kanColleWidget', 'build/kanColleWidget.zip');
};

var build_stg = function () {
    'use strict';
    fs.removeSync('build/stg.kanColleWidget');
    fs.mkdirpSync('build/stg.kanColleWidget');
    fs.copySync('src', 'build/stg.kanColleWidget/src');
    fs.copySync('chrome_ex_oauth.html', 'build/stg.kanColleWidget/chrome_ex_oauth.html');

    fs.readdirSync('build/stg.kanColleWidget/src/img').forEach(function (filename) {
        if (!/^icon.*\.png$/.test(filename)) { return; }
        var file = 'build/stg.kanColleWidget/src/img/' + filename;
        fs.copySync(file, 'build/stg.kanColleWidget/' + filename);
        fs.removeSync(file);
    });

    fs.copySync('manifest/prod.json', 'build/stg.kanColleWidget/manifest.json');
    var manifestText = fs.readFileSync('build/stg.kanColleWidget/manifest.json', {encoding: 'utf-8'});
    var manifest = JSON.parse(manifestText);
    fs.writeFileSync('build/stg.kanColleWidget/manifest.json.bak', manifestText);
    fs.writeFileSync('build/stg.kanColleWidget/manifest.json', manifestText.replace(manifest.name, 'stg.' + manifest.name));

    createZipFile('build/stg.kanColleWidget', 'build/stg.kanColleWidget.zip');
};

var build_beta = function() {
    'use strict';
    fs.removeSync('build/beta.kanColleWidget');
    fs.mkdirpSync('build/beta.kanColleWidget');
    fs.copySync('src', 'build/beta.kanColleWidget/src');
    fs.copySync('chrome_ex_oauth.html', 'build/beta.kanColleWidget/chrome_ex_oauth.html');

    fs.readdirSync('build/beta.kanColleWidget/src/img').forEach(function (filename) {
        if (!/^icon.*\.png$/.test(filename)) { return; }
        var file = 'build/beta.kanColleWidget/src/img/' + filename;
        fs.copySync(file, 'build/beta.kanColleWidget/' + filename);
        fs.removeSync(file);
    });

    fs.copySync('manifest/icons/beta', 'build/beta.kanColleWidget');

    fs.copySync('manifest/prod.json', 'build/beta.kanColleWidget/manifest.json');
    var manifestText = fs.readFileSync('build/beta.kanColleWidget/manifest.json', {encoding: 'utf-8'});
    var manifest = JSON.parse(manifestText);
    fs.writeFileSync('build/beta.kanColleWidget/manifest.json.bak', manifestText);
    fs.writeFileSync('build/beta.kanColleWidget/manifest.json', manifestText.replace(manifest.name, 'beta.' + manifest.name));

    createZipFile('build/beta.kanColleWidget', 'build/beta.kanColleWidget.zip');
};

var build_test = function() {
    'use strict';
    return fs.copySync('src', 'test/src');
};

var build_all = function() {
    'use strict';
    build_prod();
    build_stg();
    build_beta();
    build_test();
};

var show_manifest_diff = function() {
    'use strict';
    print('\n各パッケージとのmanifestのdiffを表示');
    print('prod <==> stg');
    // 区切り文字をプラットフォームに合わせて変換するためにpath.join()を使用
    var file1 = path.join('', 'build/kanColleWidget/manifest.json');
    var file2 = path.join('', 'build/stg.kanColleWidget/manifest.json');
    var command, args, encoding;
    if ('win32' === process.platform) {
        // 暇なときにnodeでdiff.js作るかもしれないけど実際そこまで困ってないので後回し
        print('※ファイルエンコーディングがUTF-8のため、Windows環境では日本語が文字化けします (_ _)');
        command = 'fc';
        args = [file1, file2];
        encoding = 'Shift_JIS';
    } else {
        command = 'diff';
        args = [file1, file2];
        encoding = 'UTF-8';
    }
    var iconv = require('iconv-lite');
    var result = require('child_process').spawnSync(command, args);
    process.stderr.write(iconv.decode(result.stderr, encoding));
    process.stdout.write(iconv.decode(result.stdout, encoding));
};

var get_ver_in_test = function () {
    'use strict';
    return fs.readJsonSync('test/manifest.json').version || null;
};

var get_ver_in_manifest = function () {
    'use strict';
    return fs.readJsonSync('manifest/prod.json').version || null;
};

var get_ver_in_constants = function () {
    'use strict';
    var text = fs.readFileSync('src/js/Constants.js', {encoding: 'utf-8'});
    var m = text.match(/version['"]?\s*:\s*["']v(\d\.\d(\.\d)+)/);
    return m ? m[1] : null;
};

var get_ver_in_README = function () {
    'use strict';
    var text = fs.readFileSync('RELEASENOTES.md', {encoding: 'utf-8'});
    var m = text.match(/v(\d\.\d(\.\d)+)\s*<!--version-->/);
    return m ? m[1] : null;
};

var version_check = function () {
    'use strict';
    print('\nバージョン情報のチェック');
    print('manifest.json\t' + get_ver_in_manifest());
    print('Constants.js\t' + get_ver_in_constants());
    print('README.md\t' + get_ver_in_README());
    print('\nTEST\t\t' + get_ver_in_test());
};

var act = 2 < process.argv.length ? process.argv[2] : 'all';
print('cli/build.js "' + act + '"');
switch (act) {
    case 'prod':
        build_prod();
        break;
    case 'stg':
        build_stg();
        break;
    case 'test':
        build_test();
        break;
    case 'beta':
        build_beta();
        break;
    case 'all':
        build_all();
        show_manifest_diff();
        version_check();
        break;
    case 'version':
        version_check();
        break;
    default: // case 'help':
        print_help();
}
