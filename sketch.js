// let scroll = 0
// temp = 1
var hc;
var bh;
var boxArr;
var boxSize;
var arrSize;
var coordDict;
var letGoOfMouse = true

function setup() {
    createCanvas(800, 800, WEBGL);
    hc = createGraphics(800, 800, WEBGL) // hidden canvas
    boxSize = 50

    // meant to be a scalable solution to keeping track of boxes.
    showDict = { "showCube": true }
    background(220)
    angleMode(DEGREES)
    hc.angleMode(DEGREES)
    c = new HcCamera()
    bh = new BoxHasher()

    coordDict = {
        "1_1_0": [0, 0, 0],
        "1_1_1": [-1, -1, 0],
        "1_1_2": [0, -1, 1]
    }


    for (let key in coordDict) {
        print(key, coordDict[key])
    }

    // print("bh.getNextHash()", bh.getNextHash())

}


function planes(s) {

    // draw hidden plane
    nextHiddenColorArr = bh.getNextHash()
    hc.fill(nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2])
    hc.plane(50, 50, 2, 2)
    //highlight shown plane on hover
    if (areEqualArr(hc.get(mouseX, mouseY), [nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2], 255])) {
        fill(255, 255, 255)
    }
    else {
        fill(255, 0, 255)
    }
    plane(50, 50, 1, 1)
}

function mRotateX(a) {
    rotateX(a)
    hc.rotateX(a)
}

function mRotateY(a) {
    rotateY(a)
    hc.rotateY(-a)
}

function sixFaceBox(s) {

    mpush()
    mTranslate(0, 0, s / 2) // front face       1   
    planes(s)
    mpop()

    mpush()
    mTranslate(0, 0, -(s / 2)) // back face     2
    planes(s)
    mpop()

    mpush()
    mTranslate(s / 2, 0, 0) // right face       3
    mRotateX(90)
    mRotateY(90)
    planes()
    mpop()

    mpush()
    mTranslate(-s / 2, 0, 0) // left face       4
    mRotateX(90)
    mRotateY(90)
    planes()
    mpop()

    mpush()
    mTranslate(0, -s / 2, 0) // top face        5
    mRotateX(90)
    planes()
    mpop()

    mpush()
    mTranslate(0, s / 2, 0) // bottom face      0
    mRotateX(90)
    planes()
    mpop()
}

function boxes() {
    sixFaceBox(50)
}

function detachBox() {
    hiddenColor = hc.get(mouseX, mouseY)
    // If a box is not clicked, return
    print("hiddenColor", hiddenColor)
    if (hiddenColor[1] == 0 && hiddenColor[2] == 0 && hiddenColor[0] == 0) {
        return
    }
    selectedBox = bh.getKey([Math.floor((hiddenColor[0] - 1) / 6), Math.floor((hiddenColor[1] - 1) / 6), Math.floor((hiddenColor[2] - 1) / 6)])

    delete coordDict[selectedBox]
}

function attachBox() {
    hiddenColor = hc.get(mouseX, mouseY)
    // If a box is not clicked, return
    print("hiddenColor", hiddenColor)
    if (hiddenColor[1] == 0 && hiddenColor[2] == 0 && hiddenColor[0] == 0) {
        return
    }

    selectedBox = bh.getKey([hiddenColor[0], hiddenColor[1], Math.floor((hiddenColor[2] - 1) / 6)])
    // selectedBox = bh.getKey([Math.floor((hiddenColor[0] - 1) / 6), Math.floor((hiddenColor[1] - 1) / 6), Math.floor((hiddenColor[2] - 1) / 6)])

    print("selectedBox", selectedBox)
    coordOfSelectedBox = coordDict[selectedBox]
    faceNum = hiddenColor[2] % 6
    nextBoxKey = bh.getNextAssignedBoxKey()
    print("nextBoxKey", nextBoxKey)
    switch (faceNum) {
        case 1:
            // print("clicked front face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0], coordOfSelectedBox[1], coordOfSelectedBox[2] + 1]
            break;
        case 2:
            // print("clicked back face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0], coordOfSelectedBox[1], coordOfSelectedBox[2] - 1]
            break;
        case 3:
            // print("clicked right face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0] + 1, coordOfSelectedBox[1], coordOfSelectedBox[2]]
            break;
        case 4:
            // print("clicked left face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0] - 1, coordOfSelectedBox[1], coordOfSelectedBox[2]]
            break;
        case 5:
            // print("clicked top face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0], coordOfSelectedBox[1] - 1, coordOfSelectedBox[2]]
            break;
        case 0:
            // print("clicked bottom face")
            coordDict[bh.getKey(nextBoxKey)] = [coordOfSelectedBox[0], coordOfSelectedBox[1] + 1, coordOfSelectedBox[2]]
            break;
        default:
    }
    print(coordDict)
    print(bh.boxCounter)
}


function mouseClicked() {
    // // set current mouse postion in the camera object
    c.currX = mouseX
    c.currY = mouseY

    // console.log(hc.get(mouseX, mouseY))
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

    // print(hc.get(mouseX, mouseY))



    // print(hc.get(mouseX, mouseY))
    // print(bh.getKey(hc.get(mouseX, mouseY)))
    // print("Mouse moved: ", bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse) // the value hovered over is set to true within the colorInUse dict

    // if (areEqualArr(hc.get(mouseX, mouseY), [0, 255, 0, 255])) {
    // if (bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse) {
    //     bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))] = true
    // }
    // else {
    //     bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))] = false
    // }

    // print("Mouse moved (key is in dict): ", bh.getKey(hc.get(mouseX, mouseY)) in bh.colorInUse)
    // print(bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))]) // the value hovered over is set to true within the colorInUse dict
    // print("Mouse moved (colorInUse dict): ", bh.colorInUse)

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
        c.truckForward(10, hc) //needs improvment
    }
    // move camera down
    else if (key == "s") {
        c.truckBack(10, hc) //needs improvment
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


function renderCoordDict() {

    mpush()
    for (let key in coordDict) {
        mpush()
        mTranslate(coordDict[str(key)][0] * boxSize, coordDict[str(key)][1] * boxSize, coordDict[str(key)][2] * boxSize)
        boxes()
        mpop()
    }
    mpop()
}


function renderBoxes(d) { // let d be dimention
    // assuming d is always odd, divide d by 2 then round down to get the middle index
    mid = Math.floor(d / 2)
    // move to a corner of the 3d grid

    mpush()
    mTranslate(-(mid * boxSize), -(mid * boxSize), -(mid * boxSize))
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            for (let k = 0; k < d; k++) {
                mpush()
                mTranslate(i * boxSize, j * boxSize, k * boxSize)
                if (boxArr[i][j][k] == 1)
                    boxes()
                mpop()
            }
        }
    }
    mpop()
}

function mouseReleased() {
    letGoOfMouse = true
}

async function draw() {

    // IMPORTANT-- clear must be called otherwise the hidden canvas will have the "dragged" effect
    hc.clear()
    bh.restartBoxHasher()


    loadPixels()
    hc.loadPixels()

    background(220);
    hc.background(0)


    renderCoordDict()
    // renderBoxes(arrSize) // old implementation


    if (mouseIsPressed) {
        if (mouseButton === LEFT && letGoOfMouse) {
            attachBox()
            // print(hc.get(mouseX, mouseY))
            letGoOfMouse = false
        }
        if (mouseButton === RIGHT && letGoOfMouse) {
            detachBox()
            letGoOfMouse = false
        }
        if (mouseButton === CENTER) {
            print("pressed center")
        }
    }


    // c.debug()
    debugMode()

    // My implementation of orbital control to integrate the hidden canvas -- Note: cameraZ is modified by 'mouseWheel' before getting passed.
    c.updateCamera(hc)

    // hc.background(0)

    resetMatrix()

}