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
Aprilfool.thePrefix = "艦これウィジェット使ってたら";
Aprilfool.theReason = "";
Aprilfool.theConclusion = "これぜったい垢BAN対象だと思います！";
Aprilfool.specialRate = 0.3;
Aprilfool.Reasons = {
    normal: [
        "小破轟沈しました。やっぱり",
        "PCが壊れました。",
        "頻繁に猫ります。",
        "彼女ができました。"
    ],
    special: [
        "武蔵が出ません。",
        "菱餅集まりませんでした。",
        "龍驤がまな板です。",
        "アニメも楽しめました。やっぱり",
        "留年したので、"
    ]
}
Aprilfool.URL = "http://otiai10.github.io/kanColleWidget/aprilfools/2015";
Aprilfool.TwiterIntentURL = "https://twitter.com/intent/tweet";
Aprilfool.HashTags = "春のBANまつり,AprilFools";
window.onload = function(){
    Aprilfool.theReason = Aprilfool.getReason();
    var theText = Aprilfool.thePrefix + Aprilfool.theReason + Aprilfool.theConclusion;
    document.getElementById("js-text-to-tweet").innerHTML = theText;
    document.getElementById("js-tweet-now").addEventListener('click',function(){
        var text = document.getElementById("js-text-to-tweet").innerText;
        Aprilfool.Twitter.tweet(text);
    });
}
