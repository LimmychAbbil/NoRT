// Checking page title

    //Creating Elements
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Prepending to DOM 
    document.body.prepend(btn);
    var isBindingActive = false;
    addObserver();


function addObserver() {
    console.log("Adding observer");
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
            if (!isBindingActive) {
                isBindingActive = true;
                hideRTs("r-111h2gw r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xzupcd"); //TODO detect className
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
    //

function hideRTs(rtClassName) {
    var allElementsWithRtClassName = document.getElementsByClassName(rtClassName);
    
    console.log("Elements with " + rtClassName + " " + allElementsWithRtClassName.length);
    
     for (const elementToHide of allElementsWithRtClassName) {
        elementToHide.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute("style", "display:none");
    }
}