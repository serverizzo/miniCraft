// let scroll = 0
// temp = 1
var hc;

function setup() {
    createCanvas(400, 400, WEBGL);
    hc = createGraphics(400, 400, WEBGL) // hidden canvas

    // meant to be a scalable solution to keeping track of boxes.
    showDict = { "showCube": true }
    background(220)
    angleMode(DEGREES)

    c = new HcCamera()
    bh = new BoxHasher()

}

function boxes() {
    if (bh.colorIsUsed(hc.get(mouseX, mouseY))) {
        // if (showDict["showCube"] == true) {
        fill(255, 255, 255)
    }
    else { // for testing
        fill(255, 0, 255)
    }
    box(50)
    nextHiddenColorArr = bh.getNextHash()
    // hc.fill(0, 255, 0)
    hc.fill(nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2]) // there seems to be a problem getting the color in the hidden canvas when the fill is editied
    hc.box(50)
}

function mouseClicked() {

    // set current mouse postion in the camera object
    c.currX = mouseX
    c.currY = mouseY

    console.log(get(mouseX, mouseY))
    if (key == "A") {
        print("Holding shift while clicking mouse acomplished!")
    }
}

function areEqualArr(arr1, arr2) {
    if (arr1.length != arr2.length)
        return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false
        }
    }
    return true
}



function mouseMoved() {
    // if the mouse is pointing to a green box in the hidden canvas, we want to not show the other box.

    print(hc.get(mouseX, mouseY))

    if (areEqualArr(hc.get(mouseX, mouseY), [0, 255, 0, 255])) {
        // if (bh.colorIsUsed(hc.get(mouseX, mouseY))) {
        showDict["showCube"] = true
    }
    else {
        showDict["showCube"] = false
    }
    // print(hc.get(mouseX, mouseY))
    // print(showDict)
}


// zoom will move 
function mouseWheel(event) {
    print(event.delta)
    let s = 1.10 // ourscaler value 
    if (event.delta < 0) {
        c.zoomOut(1.10, hc)
    }
    else {
        c.zoomIn(1.10, hc)
    }
}

function mouseDragged() {

    if (mouseX > c.currX) {
        c.rotateRight(c.sensitivity, hc)
    }
    else if (mouseX < c.currX) {
        c.rotateLeft(c.sensitivity, hc)
    }

    if (mouseY > c.currY) {
        c.truckUp(5, hc)
    }

    if (mouseY < c.currY) {
        c.truckDown(5, hc)
    }
    c.currY = mouseY
    c.currX = mouseX

}

function keyPressed() {
    // move camera up
    if (key == "w") {
        c.truckUp(10, hc)
    }
    // move camera down
    else if (key == "s") {
        c.truckDown(10, hc)
    }
    else if (keyCode == 65) { // a
        print(c.cameraX, "you pressed a")
        c.truckLeft(10, hc)
        // c.panRight(c.pansensitivity)
    }
    else if (keyCode == 68) { // d
        print(c.cameraX, "you pressed d")
        c.truckRight(10, hc)

        // c.panLeft(c.pansensitivity)
    }
}





function mTranslate(x, y, z) {
    translate(x, y, z)
    hc.translate(x, -y, z)
}

function mpush() {
    hc.push()
    push()
}

function mpop() {
    pop()
    hc.pop()
}




function draw() {

    // IMPORTANT-- clear must be called otherwise the hidden canvas will have the "dragged" effect
    hc.clear()

    loadPixels()
    hc.loadPixels()

    background(220);
    hc.background(0)

    mpush()
    boxes()
    mpop()
    // push()
    mpush()
    mTranslate(80, 0, 0)
    boxes(50)
    mpop()

    mpush()
    mTranslate(0, 80, 0)
    boxes(50)
    mpop()

    mpush()
    mTranslate(0, 0, -80)
    boxes(50)
    mpop()

    // pop()

    // c.debug()
    debugMode()

    // My implementation of orbital control to integrate the hidden canvas -- Note: cameraZ is modified by 'mouseWheel' before getting passed.
    c.updateCamera(hc)

    // hc.background(0)
    bh.restartBoxHasher()


    resetMatrix()

}