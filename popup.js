//FIXME: doesn't work
//import {reloadPage} from './controls/reloadPage';

const showRTs = document.getElementById("showRTs");
const showRCs = document.getElementById("showRCs");
const showRPs = document.getElementById("showRPs");
const showPinned = document.getElementById("showPinned");

function loadConfig(key, element) {
    chrome.storage.local.get([key], function(result) {
        if (result[key] != null) {
            element.checked = result[key];
        } else {
            element.checked = true;
        }
    });
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

function handleClick(key, element) {
    chrome.storage.local.set({ [key]: element.checked });
    reloadPage();
}

loadConfig('confHideRTs', showRTs);
loadConfig('confHideRCs', showRCs);
loadConfig('confHideRPs', showRPs);
loadConfig('confHidePinned', showPinned);

showRTs.addEventListener("click", function () {handleClick('confHideRTs', showRTs)});
showRCs.addEventListener("click", function () {handleClick('confHideRCs', showRCs)});
showRPs.addEventListener("click", function () {handleClick('confHideRPs', showRPs)});
showPinned.addEventListener("click", function () {handleClick('confHidePinned', showPinned)});

/*
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
*/
/*LISTENER FOR DEBUG PURPOSES:
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
          var storageChange = changes[key];
          window.alert('Storage key' + key + ' in namespace' + namespace +' changed. ' +
                      'Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
        }
      });*/ 