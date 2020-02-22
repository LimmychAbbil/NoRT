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

function handleClick(key, element) {
    chrome.storage.local.set({ [key]: element.checked });
    reloadPage();
}

loadConfig('confHideRTs', showRTs);
//loadConfig('confHideRCs', showRCs);
loadConfig('confHideRPs', showRPs);
loadConfig('confHidePinned', showPinned);

showRTs.addEventListener("click", function () {handleClick('confHideRTs', showRTs)});
showRCs.addEventListener("click", function () {handleClick('confHideRCs', showRCs)});
showRPs.addEventListener("click", function () {handleClick('confHideRPs', showRPs)});
showPinned.addEventListener("click", function () {handleClick('confHidePinned', showPinned)});


/*LISTENER FOR DEBUG PURPOSES:
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
          var storageChange = changes[key];
          window.alert('Storage key' + key + ' in namespace' + namespace +' changed. ' +
                      'Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
        }
      });*/ 