chrome.storage.sync.get(['confHideRTs'], function(result) {
    if (result.confHideRTs != null) {
        document.getElementById("showRTs").checked = result.confHideRTs;
    } else {
        document.getElementById("showRTs").checked = true;
    }
    });

document.getElementById("showRTs").addEventListener("click", handleClick);
function handleClick() {
    chrome.storage.sync.set({ confHideRTs: document.getElementById("showRTs").checked });
    
    //reload page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
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