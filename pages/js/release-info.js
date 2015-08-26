$(function(){
  var releasenotes = "https://raw.githubusercontent.com/otiai10/kanColleWidget/develop/RELEASENOTES.md";
  $.get(releasenotes, function(res) {
    $("#release-note").text(res);
  });
});
