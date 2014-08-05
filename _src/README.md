# KanColleWidget on TypeScript

TypeScriptで書き直すんじゃ〜＾

# 目指すもの

manifest.jsonにおいて
```javascript
"background": {
    "persistent": true,
    "scripts": [
        "src/js/jquery.min.js",
        "build/background.min.js",
        "src/js/main.js"
    ],
    "content_scripts": [
        {
            "matches": [
                "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/?mode=*"
            ],
            "js": [
                "build/pages.min.js",
                "src/js/pages/proxy.js"
            ]
        }
    ]
}
```
的な感じで、backgroundがロードしなきゃいけないjsと、content_scriptsがロードしなきゃいけないjsを分ける。
アプリケーションはそれぞれ別に用意する。（main.js, proxy.jsが相当）

# ビルド

```sh
grunt build
```

# プロジェクト

- まず既存jsをconcatしてみるかなー
- そういうのもめんどいのでゼロから書くかなー
- Phantomjsでchromeオブジェクト含むテストもしたいなー
