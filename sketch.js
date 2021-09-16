// let scroll = 0
// temp = 1
var hc;
var bh;

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
    // print("boxes (colorInUse dict value): ", bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))])
    // print("boxes (isColorInUse function): ", bh.isColorInUse(hc.get(mouseX, mouseY)))

    if (bh.isColorInUse(hc.get(mouseX, mouseY))) {
        // if (showDict["showCube"] == true) {
        print("true condition triggering")
        fill(255, 255, 255)
    }
    else { // for testing
        // print("false condition triggering")
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

    bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))] = true

    // print(bh.isColorInUse(hc.get(mouseX, mouseY)))
    // print(bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))])
    // print(hc.get(mouseX, mouseY))
    // print(bh.getKey(hc.get(mouseX, mouseY)))
    // print(bh.colorInUse)
    // print(bh.isColorInUse(hc.get(mouseX, mouseY)))

    print("mouseClicked (colorInUse dict value): ", bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))])
    print("mouseClicked (isColorInUse function): ", bh.isColorInUse(hc.get(mouseX, mouseY)))

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

    print(hc.get(mouseX, mouseY))
    print(bh.getKey(hc.get(mouseX, mouseY)))
    // print("Mouse moved: ", bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse) // the value hovered over is set to true within the colorInUse dict

    // if (areEqualArr(hc.get(mouseX, mouseY), [0, 255, 0, 255])) {
    if (bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse) {
        bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))] = true
    }
    // else {
    //     bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))] = false
    // }

    print("Mouse moved (key is in dict): ", bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse)
    print(bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))]) // the value hovered over is set to true within the colorInUse dict
    print("Mouse moved (colorInUse dict): ", bh.colorInUse)

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


async function draw() {

    // IMPORTANT-- clear must be called otherwise the hidden canvas will have the "dragged" effect
    hc.clear()
    bh.restartBoxHasher()


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

    resetMatrix()

}