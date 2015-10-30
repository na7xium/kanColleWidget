$(function(){

    // {{{ #426
    /*
    if (Util.system.isWindows()) {
        chrome.runtime.sendMessage(null, {
            purpose: 'getStatusWindowPositionTracking'
        }, function(tracked) {
            var trackedSize = tracked['size'] || {};
            window.resizeTo(trackedSize['width'], trackedSize['height']);
        });
    }
    */
    if (Util.system.isWindows()) {
        Util.adjustSizeOfWindowsOS(window);
    }
    // }}}

    var queries = Util.parseQueryString();
    var img = new Image();
    img.src = queries.imgURI;
    img.setAttribute('class','contain-page');
    window.document.body.appendChild(img);

    // おまじない〜ww
    // https://twitter.com/otiai10/status/475116250863915008
    $('img').hide().fadeIn(500);

    var d = new Date();
    $('title').text(Util.zP(2, d.getHours()) + ":" + Util.zP(2, d.getMinutes()));

    $('body').on('click', function(e){
        Util.focusKCWidgetWindow();
    });

    if (/panel=[1-9]/.test(location.search)) {
        // position tracking いらない
        return;
    }
    setInterval(function(){
        chrome.runtime.sendMessage({
            purpose  : 'statusWindowPositionTracking',
            params: {
                coords: {
                    top: window.screenTop,
                    left: window.screenLeft
                },
                size: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        });
    }, 1 * 1000);
});
