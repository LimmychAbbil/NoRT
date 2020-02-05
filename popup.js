document.getElementById("showRTs").addEventListener("click", handleClick);
function handleClick() {
    chrome.storage.sync.set({ mytext: document.getElementById("showRTs").checked });
    
    //reload page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
    
    chrome.storage.sync.get(['mytext'], function(result) {
          window.alert('Value currently is ' + result.mytext);
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