let scroll = 0
temp = 1
var cameraZ = 300

function setup() {
    createCanvas(400, 400, WEBGL);
    hc = createGraphics(400, 400, WEBGL) // hidden canvas
    showDict = { "showCube": true }
    x = 0
}

function boxes() {
    fill(255, 255, 255)
    if (showDict["showCube"] == true) {
        box(50)
    }
    else { // for testing
        fill(255, 0, 255)
        box(50)
    }
    hc.fill(0, 255, 0)
    hc.box(50)
}

function mouseClicked() {
    console.log(get(mouseX, mouseY))
}

function areEqualArr(arr1, arr2) {
    if (arr1.length != arr2.length)
        return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[2]) {
            return false
        }
    }
    return true
}

function mouseWheel(event) {
    scroll += event.delta
    // console.log(scroll)
    print(event.delta)
    if (event.delta < 0) {
        print("scaling down")
        cameraZ -= 10
        // hc.scale(0.09, 0.09, 0.09)
        // scale(0.09,0.09,0.09)
    }
    else {
        print("scaling up")
        cameraZ += 10
        //     hc.scale(1.01,1.01,1.01)  
        //     scale(1.01,1.01,1.01)
    }
}

function mouseMoved() {
    // console.log(hc.get(mouseX,mouseY))

    print(hc.get(mouseX, mouseY))

    if (!areEqualArr(hc.get(mouseX, mouseY), [0, 255, 0, 255])) {
        showDict["showCube"] = false
    }
    else {
        showDict["showCube"] = true
        // console.log("something is wrong")
    }
}

function mcamera(z) {
    hc.resetMatrix()
    resetMatrix()

    camera(1, 1, z)
    hc.camera(1, 1, z)
}


function draw() {
    background(220);
    hc.background(0)

    mcamera(cameraZ)

    boxes()
    loadPixels()
    hc.loadPixels()
}