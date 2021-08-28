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

}

function boxes() {
    if (showDict["showCube"] == true) {
        fill(255, 255, 255)
    }
    else { // for testing
        fill(255, 0, 255)
    }
    box(50)
    hc.fill(0, 255, 0)
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
    if (areEqualArr(hc.get(mouseX, mouseY), [0, 255, 0, 255])) {
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
        c.zoomOut(1.10)
    }
    else {
        c.zoomIn(1.10)
    }
}

function mouseDragged() {

    if (mouseX > c.currX) {
        c.rotateRight(c.sensitivity)
    }
    else if (mouseX < c.currX) {
        c.rotateLeft(c.sensitivity)
    }
    if (mouseY > c.currY) {
        c.cameraY -= c.sensitivity
    }
    if (mouseY < c.currY) {
        c.cameraY += c.sensitivity
    }
    c.currY = mouseY
    c.currX = mouseX

}

function keyPressed() {
    // if (key == "A") {
    //     c.rotateLeft(10)
    // }
    // else if (key == "D") {
    //     c.rotateRight(10)
    // }
    // move camera up
    if (key == "w") {
        c.cameraY -= 10
    }
    // move camera down
    else if (key == "s") {
        c.cameraY += 10
    }
    else if (keyCode == 65) { // a
        print(c.cameraX, "you pressed a")
        camera.move()
        // c.panRight(c.pansensitivity)
    }
    else if (keyCode == 68) { // d
        print(c.cameraX, "you pressed d")
        // c.panLeft(c.pansensitivity)
    }
}



function mcamera(x, y, z, cx, cz) {
    // hc.resetMatrix()
    // resetMatrix()
    camera(x, y, z, cx, 0, cz, 0, 1, 0)
    hc.camera(x, -y, z, cx, 0, cz, 0, 1, 0)
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
    mcamera(c.cameraX, c.cameraY, c.cameraZ, c.centerX, c.centerZ)

    // hc.background(0)


    resetMatrix()

}