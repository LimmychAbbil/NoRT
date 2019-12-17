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