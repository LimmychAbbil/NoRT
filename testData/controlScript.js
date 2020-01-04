function getRandomNumberOfAddedBlocks() {
    var i = 5 + Math.floor(Math.random() * 11);
   
    return i;
}

const BLOCK_ONE = "<div class=\"wrapper\"><hr><div class=\"innerContent2\">Content2</div></div>";
const BLOCK_TWO = "<div class=\"wrapper\"><hr><div class=\"innerContent1\">Content1</div><div class=\"innerContent2\">Content2</div></div>";

function addRandomNumberOfBlocks() {
    var numberOfBlocks = getRandomNumberOfAddedBlocks();
 
   
    console.log(numberOfBlocks + " will be added");
    
    for (i = 0; i < numberOfBlocks; i++) {
        if (Math.random() > 0.3) {
            document.getElementById("pageContent").innerHTML += BLOCK_ONE;
        } else {
            document.getElementById("pageContent").innerHTML += BLOCK_TWO;
        }
    }
}

var isBindingActive = false;

function addObserver() {
    console.log("Adding observer");
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
            if (!isBindingActive) {
                isBindingActive = true;
                hideRTs("innerContent1"); //TODO detect className
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

function hideRTs(rtClassName) {
    var allElementsWithRtClassName = document.getElementsByClassName(rtClassName);
    
    console.log("Elements with " + rtClassName + " " + allElementsWithRtClassName.length);
    
     for (const elementToHide of allElementsWithRtClassName) {
        elementToHide.parentElement.setAttribute("style", "display:none");
    }
}