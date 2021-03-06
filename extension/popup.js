function openTab(location) {
    chrome.tabs.create({active: true, url: location});
}

const showRTs = document.getElementById("showRTs");
const showRCs = document.getElementById("showRCs");
const showRPs = document.getElementById("showRPs");
const showPinned = document.getElementById("showPinned");
const autoReload = document.getElementById("autoReload");

const donateButton = document.getElementById("visitDonate");
const contributeButton = document.getElementById("visitContribute");

function loadConfig(key, element, defaultValue) {
    chrome.storage.local.get([key], function(result) {
        if (result[key] != null) {
            element.checked = result[key];
        } else {
            element.checked = defaultValue;
        }
    });
}

function handleClick(key, element) {
    chrome.storage.local.set({ [key]: element.checked });
    if (autoReload.checked) {
        reloadPage();
    }
}

loadConfig('confHideRTs', showRTs, true);
//loadConfig('confHideRCs', showRCs);
loadConfig('confHideRPs', showRPs, false);
loadConfig('confHidePinned', showPinned, false);
loadConfig('confAutoReload', autoReload, true);

showRTs.addEventListener("click", function () {handleClick('confHideRTs', showRTs)});
showRCs.addEventListener("click", function () {handleClick('confHideRCs', showRCs)});
showRPs.addEventListener("click", function () {handleClick('confHideRPs', showRPs)});
showPinned.addEventListener("click", function () {handleClick('confHidePinned', showPinned)});
autoReload.addEventListener("click", function () {chrome.storage.local.set({ confAutoReload: autoReload.checked })});

donateButton.addEventListener("click", function () {openTab('https://limmychabbil.github.io/NoRT/pages/donate')});
contributeButton.addEventListener("click", function () {openTab('https://github.com/LimmychAbbil/NoRT/')});




/*LISTENER FOR DEBUG PURPOSES:
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
          var storageChange = changes[key];
          window.alert('Storage key' + key + ' in namespace' + namespace +' changed. ' +
                      'Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
        }
      });*/ 