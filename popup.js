//FIXME: doesn't work
//import {reloadPage} from './controls/reloadPage';
chrome.storage.sync.get(['confHideRTs'], function(result) {
    if (result.confHideRTs != null) {
        document.getElementById("showRTs").checked = result.confHideRTs;
    } else {
        document.getElementById("showRTs").checked = true;
    }
    });

chrome.storage.sync.get(['confHideRCs'], function(result) {
    if (result.confHideRCs != null) {
        document.getElementById("showRCs").checked = result.confHideRCs;
    } else {
        document.getElementById("showRCs").checked = true;
    }
    });

chrome.storage.sync.get(['confHideRPs'], function(result) {
    if (result.confHideRPs != null) {
        document.getElementById("showRPs").checked = result.confHideRPs;
    } else {
        document.getElementById("showRPs").checked = true;
    }
    });

chrome.storage.sync.get(['confHidePinned'], function(result) {
    if (result.confHidePinned != null) {
        document.getElementById("showPinned").checked = result.confHidePinned;
    } else {
        document.getElementById("showPinned").checked = true;
    }
    });

document.getElementById("showRTs").addEventListener("click", handleClickRTs);
document.getElementById("showRCs").addEventListener("click", handleClickRCs);
document.getElementById("showRPs").addEventListener("click", handleClickRPs);
document.getElementById("showPinned").addEventListener("click", handleClickPinned);
function handleClickRTs() {
    chrome.storage.sync.set({ confHideRTs: document.getElementById("showRTs").checked });
    reloadPage();
}
function handleClickRCs() {
    chrome.storage.sync.set({ confHideRCs: document.getElementById("showRCs").checked });
    reloadPage();
}
function handleClickRPs() {
    chrome.storage.sync.set({ confHideRPs: document.getElementById("showRPs").checked });
    reloadPage();
}
function handleClickPinned() {
    chrome.storage.sync.set({ confHidePinned: document.getElementById("showPinned").checked });
    reloadPage();
}

function reloadPage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTabURL = tabs[0].url;
        var url = new URL(activeTabURL);
        if (url.hostname === "twitter.com") {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}
/*LISTENER FOR DEBUG PURPOSES:
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
          var storageChange = changes[key];
          window.alert('Storage key' + key + ' in namespace' + namespace +' changed. ' +
                      'Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
        }
      });*/ 