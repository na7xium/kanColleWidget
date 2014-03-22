var Aprilfool = {};
Aprilfool.getReason = function(){
    if (Math.random() < Aprilfool.specialRate) return Aprilfool.Reasons.normal;
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
Aprilfool.specialRate = 0.5;
Aprilfool.Reasons = {
    normal: "垢BANされるらしいので、",
    special: [
        "那珂ちゃんがウザいので、"
    ]
}
Aprilfool.URL = "http://otiai10.github.io/kanColleWidget/AprilFool";
Aprilfool.TwiterIntentURL = "https://twitter.com/intent/tweet";
Aprilfool.HashTags = "春のBANまつり";
window.onload = function(){
    Aprilfool.theReason = Aprilfool.getReason();
    var theText = Aprilfool.theReason + Aprilfool.theConclusion;
    document.getElementById("reason").innerHTML = theText;
    document.getElementById("share-to-twitter").addEventListener('click',function(){
        Aprilfool.Twitter.tweet(theText);
    });
}
