if (/^https:\/\/twitter.com\/intent\/tweet\/complete.*$/.test(location.href)) {
    chrome.runtime.sendMessage(null,{purpose: 'tweetCompleted'});
}
