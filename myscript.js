const ElementsEnum = Object.freeze(
    {
        "pinned":"M20.235 14.61c-.375-1.745-2.342-3.506-4.01-4.125l-.544-4.948 1.495-2.242c.157-.236.172-.538.037-.787-.134-.25-.392-.403-.675-.403h-9.14c-.284 0-.542.154-.676.403-.134.25-.12.553.038.788l1.498 2.247-.484 4.943c-1.668.62-3.633 2.38-4.004 4.116-.04.16-.016.404.132.594.103.132.304.29.68.29H8.64l2.904 6.712c.078.184.26.302.458.302s.38-.118.46-.302l2.903-6.713h4.057c.376 0 .576-.156.68-.286.146-.188.172-.434.135-.59z",
        "retweet":"M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z",
        "reply":"M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788z",
        "recommend":"M12.225 12.165c-1.356 0-2.872-.15-3.84-1.256-.814-.93-1.077-2.368-.805-4.392.38-2.826 2.116-4.513 4.646-4.513s4.267 1.687 4.646 4.513c.272 2.024.008 3.46-.806 4.392-.97 1.106-2.485 1.255-3.84 1.255zm5.849 9.85H6.376c-.663 0-1.25-.28-1.65-.786-.422-.534-.576-1.27-.41-1.968.834-3.53 4.086-5.997 7.908-5.997s7.074 2.466 7.91 5.997c.164.698.01 1.434-.412 1.967-.4.505-.985.785-1.648.785z"
    }
);
Object.freeze(ElementsEnum);

    chrome.configHideRetweetsEnabled = true;
    chrome.configHideRecommendEnabled = true;
    chrome.configHideRepliesEnabled = true;
    chrome.configHidePinnedEnabled = true;
    var isBindingActive = false;
    addObserver();


function addObserver() {
    readConfig('confHideRTs', 'configHideRetweetsEnabled', true);
    readConfig('confHideRPs', 'configHideRepliesEnabled', false);
    readConfig('confHidePinned', 'configHidePinnedEnabled', false);
    if (!(chrome.configHideRetweetsEnabled && chrome.configHideRecommendEnabled && chrome.configHideRepliesEnabled && chrome.configHidePinnedEnabled)) {
        console.log("Config is to show all tweets. No actions will be done with twitter page");
        return;
    }

    console.log("Adding observer");
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
            if (!isBindingActive) {
                isBindingActive = true;
                hideTweets();
                isBindingActive = false;
            }
    });
    
    observer.observe(document, {
            subtree:true,
            attributes:false,
            childList: true,
            characterData: true
            //...
    });
}

    function readConfig(key, flagName, defaultValue) {
        //TODO check if I can unite gets
        chrome.storage.local.get([key], function(result) {
            if (result[key] != null) {
                chrome[flagName] = result[key];
            } else {
                chrome[flagName] = defaultValue;
            }
        });
    }

function hideTweets() {

    var allElementsWithIcon = document.getElementsByTagName("g");
    
     for (const elementToHide of allElementsWithIcon) {
            checkAndHideElement(elementToHide, ElementsEnum.retweet, chrome.configHideRetweetsEnabled);
            //FIXME this icon appear in another place and the whole feed disabled. Should be active only on the news feed
            //checkAndHideElement(elementToHide, ElementsEnum.recommend, configHideRecommendEnabled);
            checkAndHideElement(elementToHide, ElementsEnum.reply, chrome.configHideRepliesEnabled);
            checkAndHideElement(elementToHide, ElementsEnum.pinned, chrome.configHidePinnedEnabled);
    }
}

function checkAndHideElement(elementToHide, elementType, flag) {
    if (elementToHide.firstElementChild != null && elementToHide.firstElementChild.getAttribute("d") === elementType && flag) {
        elementToHide.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute("style", "display:none");
    }
}