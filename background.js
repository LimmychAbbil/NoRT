chrome.runtime.onInstalled.addListener(function() {
        //need?
  });
  
 chrome.tabs.onUpdated.addListener(function() {
    if (true) {
        chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;

        var url = new URL(tablink);
        if (url.hostname == "twitter.com") {
            window.alert("I am on twitter");
        }
});
    }
 });