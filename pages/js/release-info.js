$(function(){
    $.get("https://cdn.rawgit.com/otiai10/kanColleWidget/develop/README.md", function(res) {
        var info = res.split("- RELEASEINFO\n")[1];
        $("#release-note").text(info);
    });
});
