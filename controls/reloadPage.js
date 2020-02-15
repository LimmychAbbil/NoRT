
export function reloadPage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTabURL = tabs[0].url;
        var url = new URL(activeTabURL);
        if (url.hostname === "twitter.com") {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}