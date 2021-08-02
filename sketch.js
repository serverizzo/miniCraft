// let scroll = 0
// temp = 1
var cameraZ = 300
var hc;

function setup() {
    createCanvas(400, 400, WEBGL);
    hc = createGraphics(400, 400, WEBGL) // hidden canvas

    // meant to be a scalable solution to keeping track of boxes.
    showDict = { "showCube": true }
    x = 0
    background(220)
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
    print(hc.get(mouseX, mouseY))
    print(showDict)
}


function mouseWheel(event) {
    print(event.delta)
    if (event.delta < 0)
        cameraZ -= 10
    else
        cameraZ += 10
}


function mcamera(z) {
    // hc.resetMatrix()
    // resetMatrix()
    camera(1, 1, z)
    hc.camera(1, 1, z)
}

function draw() {

    background(220);
    hc.background(0)
    boxes()

    // My implementation of orbital control to integrate the hidden canvas -- Note: cameraZ is modified by 'mouseWheel' before getting passed.
    mcamera(cameraZ)

    // hc.background(0)

    loadPixels()
    hc.loadPixels()
}