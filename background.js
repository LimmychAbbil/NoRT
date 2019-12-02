chrome.runtime.onInstalled.addListener(function() {
        //need?
  });
  
 chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;

    var url = new URL(tablink);
    if (url.hostname === "twitter.com") {
        var gList = document.getElementsByTagName("g");
        window.alert(gList.length);
    }
});
 });