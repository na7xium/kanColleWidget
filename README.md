# 艦これウィジェット <img width="40px" src="src/img/icon.png" />

艦これウィジェットのAPPモードは
- 艦隊名が変えられない
- 課金系の処理が行えない
- 本来ページ内のiframeの中で表示されるコンテンツに直接アクセスしていてあまり好きじゃなかった
→WHITEモードでリサイズできれば最高だよね！ってことで出来ました。

# 開発

dependencies

```
npm install -g grunt-cli
npm install -g bower
```

setup

```
npm install
grunt boot
bower install
```

build

```
grunt build
```

and import `src/kanColleWidget` as a Chrome Extension.
