// let scroll = 0
// temp = 1
var hc;

// Camera Variables
// where the camera is
var cameraZ = 300
var cameraX = 0
var cameraY = 0
//where the camera is looking
var centerX = 0
var centerZ = 0


function setup() {
    createCanvas(400, 400, WEBGL);
    hc = createGraphics(400, 400, WEBGL) // hidden canvas

    // meant to be a scalable solution to keeping track of boxes.
    showDict = { "showCube": true }
    x = 0
    background(220)
    angleMode(DEGREES)
}

function boxes() {
    push()
    fill(255, 255, 255)
    if (showDict["showCube"] == true) {
        box(50)
    }
    else { // for testing
        fill(255, 0, 255)
        box(50)
    }

    // IMPORTANT-- clear must be called otherwise the hidden canvas will have the "dragged" effect
    hc.clear()
    hc.fill(0, 255, 0)
    hc.box(50)
    pop()
}

function mouseClicked() {
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
        cameraX /= 1.10
        cameraY /= 1.10
        cameraZ /= 1.10
    }
    else {
        cameraX *= 1.10
        cameraY *= 1.10
        cameraZ *= 1.10
    }
}

function generateXZDistanceFromCenter() {
    return sqrt(sq(cameraX - centerX) + sq(cameraZ - centerZ))
}

// note: x should be the opposite side, z should be the adj side
function getCurrentXZAngle() {
    return atan(cameraX / cameraZ)
}

// returns the new x and z componenets respectfully
function getXZComponenets(theta) {
    return [sin(theta) * generateXZDistanceFromCenter(), cos(theta) * generateXZDistanceFromCenter()]
}

function rotateLeft(step) {
    let xzTheta = getCurrentXZAngle() + step
    let temparr = getXZComponenets(xzTheta)
    cameraX = temparr[0]
    cameraZ = temparr[1]
}

function rotateRight(step) {
    let xzTheta = getCurrentXZAngle() - step
    let temparr = getXZComponenets(xzTheta)
    cameraX = temparr[0]
    cameraZ = temparr[1]
}

function panRight(step) {
    let xzTheta = getCurrentXZAngle() + 90 // to make a perpendicular angle
    let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
    centerX += temparr[0]
    centerZ += temparr[1]
    cameraX += temparr[0]
    cameraZ += temparr[1]
}

function panLeft(step) {
    let xzTheta = getCurrentXZAngle() + 90 // to make a perpendicular angle
    let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
    centerX -= temparr[0]
    centerZ -= temparr[1]
    cameraX -= temparr[0]
    cameraZ -= temparr[1]
}

function keyPressed() {
    if (key == "A") {
        rotateLeft(10)
    }
    else if (key == "D") {
        rotateRight(10)
    }
    // move camera up
    else if (key == "w") {
        cameraY -= 10
    }
    // move camera down
    else if (key == "s") {
        cameraY -= 10
    }
    else if (keyCode == 65) { // A
        print(cameraX, "you pressed a")
        panRight(10)
    }
    else if (keyCode == 68) { // D
        print(cameraX, "you pressed D")
        panLeft(10)
    }

}



function mcamera(x, y, z, cx, cz) {
    // hc.resetMatrix()
    // resetMatrix()

    camera(x, y, z, cx, 0, cz, 0, 1, 0)
    hc.camera(x, y, z, cx, 0, cz, 0, 1, 0)
}

function mTranslate(x, y, z) {
    translate(x, y, z)
    hc.translate(x, y, z)

}


function draw() {

    background(220);
    hc.background(0)
    boxes()
    push()
    mTranslate(80, 0, 0)
    boxes()
    pop()

    // My implementation of orbital control to integrate the hidden canvas -- Note: cameraZ is modified by 'mouseWheel' before getting passed.
    mcamera(cameraX, cameraY, cameraZ, centerX, centerZ)

    // hc.background(0)

    loadPixels()
    hc.loadPixels()
}