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
        "0_0_0": [0, 0, 0],
        "0_0_1": [-1, -1, 0],
        "0_0_2": [0, -1, 1]
        // "3": [0, 0, -1]
    }



    for (let key in coordDict) {
        print(key, coordDict[key])
    }



    boxArr = []
    arrSize = 9
    for (let i = 0; i < arrSize; i++) {
        boxArr.push(new Array())
        for (let j = 0; j < arrSize; j++) {
            boxArr[i].push(new Array())
            for (let k = 0; k < arrSize; k++) {
                boxArr[i][j].push(0)
            }
        }
    }
    boxArr[Math.floor(arrSize / 2)][Math.floor(arrSize / 2)][Math.floor(arrSize / 2)] = 1 // set one box right in the middle
    boxArr[Math.floor(arrSize / 2) - 1][Math.floor(arrSize / 2)][Math.floor(arrSize / 2)] = 1 // i sets left right (-1 sets left)
    boxArr[Math.floor(arrSize / 2)][Math.floor(arrSize / 2) - 1][Math.floor(arrSize / 2)] = 1 // j sets up down (-1 sets up)
    boxArr[Math.floor(arrSize / 2)][Math.floor(arrSize / 2)][Math.floor(arrSize / 2) - 1] = 1 // k sets forward back (-1 sets back)
    print(boxArr)

    // frameRate(3)
}


function planes(s) {
    nextHiddenColorArr = bh.getNextHash()
    hc.fill(nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2])
    hc.plane(50, 50, 2, 2)
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
    // print("boxes (colorInUse dict value): ", bh.colorInUse[bh.getKey(hc.get(mouseX, mouseY))])
    // print("boxes (isColorInUse function): ", bh.isColorInUse(hc.get(mouseX, mouseY)))

    // nextHiddenColorArr = bh.getNextHash()
    // hc.fill(nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2]) // there seems to be a problem getting the color in the hidden canvas when the fill is editied
    // hc.box(50)

    // if (areEqualArr(hc.get(mouseX, mouseY), [nextHiddenColorArr[0], nextHiddenColorArr[1], nextHiddenColorArr[2], 255])) {
    //     fill(255, 255, 255)
    // }
    // else { 
    //     fill(255, 0, 255)
    // }
    // sixFaceBox(50)

    // box(50)
    sixFaceBox(50)

}

function detachBox() {
    temp_arr = hc.get(mouseX, mouseY)
    // If a box is not clicked, return
    print("temp_arr", temp_arr)
    if (temp_arr[1] == 0 && temp_arr[2] == 0 && temp_arr[0] == 0) {
        return
    }
    selectedBox = bh.getKey([Math.floor((temp_arr[0] - 1) / 6), Math.floor((temp_arr[1] - 1) / 6), Math.floor((temp_arr[2] - 1) / 6)])

    delete coordDict[selectedBox]
}

function attachBox() {
    temp_arr = hc.get(mouseX, mouseY)
    // If a box is not clicked, return
    print("temp_arr", temp_arr)
    if (temp_arr[1] == 0 && temp_arr[2] == 0 && temp_arr[0] == 0) {
        return
    }
    selectedBox = bh.getKey([Math.floor((temp_arr[0] - 1) / 6), Math.floor((temp_arr[1] - 1) / 6), Math.floor((temp_arr[2] - 1) / 6)])

    print("selectedBox", selectedBox)
    coordOfSelectedBox = coordDict[selectedBox]
    faceNum = temp_arr[2] % 6
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
    // print(coordDict)
}


function mouseClicked() {
    // // set current mouse postion in the camera object
    c.currX = mouseX
    c.currY = mouseY

    if (mouseButton === RIGHT) {
        print("you pressed right")
    }

    // console.log(hc.get(mouseX, mouseY))

    // attachBox()

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
        // c.truckForward(10, hc) //needs improvment
    }
    // move camera down
    else if (key == "s") {
        // c.truckBack(10, hc) //needs improvment
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


    if (mouseIsPressed) {
        if (mouseButton === LEFT && letGoOfMouse) {
            attachBox()
            letGoOfMouse = false
            //   ellipse(50, 50, 50, 50);
        }
        if (mouseButton === RIGHT && letGoOfMouse) {
            //   rect(25, 25, 50, 50);
            detachBox()
            letGoOfMouse = false
        }
        if (mouseButton === CENTER) {
            //   triangle(23, 75, 50, 20, 78, 75);
        }
    }




    // renderBoxes(arrSize)
    // for (let i = 0; i < 3; i++) {
    //     boxArr.push(new Array())
    //     for (let j = 0; j < 3; j++) {
    //         boxArr[i].push(new Array())
    //         for (k = 0; k < 3; k++) {
    //             boxArr[i][j].push(0)
    //         }
    //     }
    // }




    // mpush()
    // boxes()
    // mpop()
    // // push()
    // mpush()
    // mTranslate(80, 0, 0)
    // boxes(50)
    // mpop()

    // mpush()
    // mTranslate(0, 80, 0)
    // boxes(50)
    // mpop()

    // mpush()
    // mTranslate(0, 0, -80)
    // boxes(50)
    // mpop()

    // mpush()
    // mTranslate(0, 80, -80)
    // boxes(50)
    // mpop()

    // pop()

    // c.debug()
    debugMode()

    // My implementation of orbital control to integrate the hidden canvas -- Note: cameraZ is modified by 'mouseWheel' before getting passed.
    c.updateCamera(hc)

    // hc.background(0)

    resetMatrix()

}