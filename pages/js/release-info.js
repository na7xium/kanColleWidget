$(function(){
    $.get("https://cdn.rawgit.com/otiai10/kanColleWidget/develop/RELEASENOTES.md", function(res) {
        $("#release-note").text(res);
    });
});
