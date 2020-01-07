/*chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    var tablink = tab.url;

        var url = new URL(tablink);
        if (url.hostname === "twitter.com") {
            //Do work
            //var gList = document.getElementsByTagName("g");
            console.log("loaded");
            window.alert(document.body.innerText.length);
            
        }

  }
})*/
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