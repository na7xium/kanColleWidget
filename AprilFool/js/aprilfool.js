var Aprilfool = {};
Aprilfool.getReason = function(){
    if (Math.random() < Aprilfool.specialRate)
        return Aprilfool.ArrayRand(Aprilfool.Reasons.normal);
    return Aprilfool.ArrayRand(Aprilfool.Reasons.special);
}
Aprilfool.ArrayRand = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
Aprilfool.Twitter = {
    tweet: function(text){
        var params = {
            text: text,
            hashtags: Aprilfool.HashTags,
            url: Aprilfool.URL
        };
        window.open(Aprilfool.TwiterIntentURL + Aprilfool.toQueryString(params));
    }
}
Aprilfool.toQueryString = function(obj){
    var params = [];
    for (key in obj) {
        params.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return "?" + params.join("&");
}
Aprilfool.theReason = "";
Aprilfool.theConclusion = "艦これウィジェットやめます！";
Aprilfool.specialRate = 0.7;
Aprilfool.Reasons = {
    normal: [
        "垢BANされるらしいので、",
        "彼女ができたので、",
        "彼氏ができたので、"
    ],
    special: [
        "長門さんの一発が強すぎるので、",
        "ビック7の力が侮れないので、",
        "陸奥っちゃんのむちむちが可愛いすぎるので、",
        "伊勢の砲塔が重いので",
        "日向に何の為に戦っているのか聞かれて困ったので",
        "しれぇ！",
        "雪風がまた生還したので、",
        "頭の中で何かが………",
        "加賀さんが素敵すぎるので！",
        "何か相談？いいけれど、",
        "私の顔に、何かついていて、",
        "飛行甲板はデリケートだから！",
        "ここは譲れません。",
        "良い作戦指揮でした。こんな艦隊なら",
        "えっと、あの、九九艦爆がはみ出ちゃうから",
        "…っあぁ、めっ！　艦載機が落ちちゃいますからぁっ！",
        "島風が早すぎるので、",
        "やーめーてーよー！",
        "もっともっと速くなってもいいの？じゃあ",
        "吹雪は艦これの主人公じゃないと思うので！",
        "吹雪は艦これの主人公だと思うので！",
        "明日から本気だす…から",
        "ありがと…がんばる…",
        "いたい、治したいし…",
        "な、何？感謝なんかしていないし",
        "砲雷撃戦って聞いても燃えないので",
        "悪い気持ちじゃないわね。",
        "ちっ、なんて指揮…あっ、",
        "作戦が悪いのよ・・・。あっいえ、",
        "まぁ私はやっぱ、基本",
        "いいね～。痺れるね～。",
        "大井の開幕魚雷が強すぎるので、",
        "北上の開幕魚雷が強すぎるので、",
        "紅茶が飲みたいので、",
        "はい、榛名は、",
        "やだ、こんな…でも、",
        "マイク音量大丈夫じゃないので",
        "鳳翔さんのごはんが食べたいので",
        "扶桑型が不幸なのは艦これウィジェットのせいなので、",
        "天龍が怖いので",
        "天龍のおっぱい揉みたいので",
        "服を切らせて骨を絶つ……",
        "RJのおっぱい揉みたいので",
        "龍驤が健気すぎるので",
        "クマータマー",
        "木曾さんの中二病についていけないので",
        "那珂ちゃんがウザいので、",
        "改二神通が決まった途端に神通ぜんぜん出ないので",
        "ちとちよの胸が意外なので",
        "ちょっと他の艦とよくブツかっちゃう癖があるんで、",
        "青葉取材、…いえ、",
        "ﾊﾟﾝﾊﾟｶﾊﾟーﾝ♪",
        "朧かわいい！",
        "曙めっちゃかわいいので！",
        "漣めっちゃかわいいので！",
        "潮かわいい！",
        "第六駆逐隊と一緒にお風呂入りたいので",
        "なんぞめでたいので、",
        "白露型の改絵が萌えるので",
        "不知火に落ち度は無いので",
        "七面鳥ですって！？",
        "倍返しなので！",
        "おかずじゃないので",
        "伊8ぜんぜん出ないので",
        "伊401ちゃんの日焼けあとが気になります！",
        "あきつ丸の顔色悪すぎるので",
        "ドイツ艦まだ一隻も出ないので",
        "霧の艦隊また会いたい..."
    ]
}
Aprilfool.URL = "http://otiai10.github.io/kanColleWidget/AprilFool";
Aprilfool.TwiterIntentURL = "https://twitter.com/intent/tweet";
Aprilfool.HashTags = "春のBANまつり,AprilFool";
window.onload = function(){
    Aprilfool.theReason = Aprilfool.getReason();
    var theText = Aprilfool.theReason + Aprilfool.theConclusion;
    document.getElementById("reason").innerHTML = theText;
    document.getElementById("share-to-twitter").addEventListener('click',function(){
        Aprilfool.Twitter.tweet(theText);
    });
    var totalText = "全" + (Aprilfool.Reasons.special.length + 1) + "通り";
    document.getElementById("total").innerHTML = totalText;
}
