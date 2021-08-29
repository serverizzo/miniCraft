
// Note: This class does not modify the camera directly. It only holds the information about where the camera should be, where the camera is looking,
// and how the camera should move when either panning, rotating, or zooming.
class HcCamera {
    constructor() {
        // Camera Variables
        // where the camera is
        this.cameraZ = 300
        this.cameraX = 0
        this.cameraY = 0
        //where the camera is looking
        this.centerX = 0
        this.centerZ = 0

        this.currX
        this.currY
        this.sensitivity = 3
        this.pansensitivity = 100

        // this.hc = createGraphics(400, 400, WEBGL) // hidden canvas

        this.shownCanvasCamera = createCamera()

    }

    updateCamera(hiddencanvas) {
        // hc.resetMatrix()
        // resetMatrix()
        // this.shownCanvasCamera.camera(this.shownCanvasCamera.eyeX, this.cameraY, this.shownCanvasCamera.eyeZ, this.centerX, 0, this.centerZ, 0, 1, 0)
        // hiddencanvas.camera(this.shownCanvasCamera.eyeX, this.cameraY, this.shownCanvasCamera.eyeZ, this.centerX, 0, this.centerZ, 0, 1, 0)
    }


    generateXZDistanceFromCenter() {
        return sqrt(sq(this.shownCanvasCamera.eyeX - this.centerX) + sq(this.shownCanvasCamera.eyeZ - this.centerZ))
    }

    // note: x should be the opposite side, z should be the adj side
    getCurrentXZAngle() {
        return atan2(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeZ)
    }

    // returns the new x and z componenets respectfully
    getXZComponenetsForRotation(theta) {
        return [sin(theta) * dist(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeZ, this.centerX, this.centerZ), cos(theta) * dist(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeZ, this.centerX, this.centerZ)]
        // return [sin(theta) * this.generateXZDistanceFromCenter(), cos(theta) * this.generateXZDistanceFromCenter()]
    }

    // rotateLeft(step) {
    //     let xzTheta = this.getCurrentXZAngle() + step
    //     let temparr = this.getXZComponenetsForRotation(xzTheta)
    //     this.shownCanvasCamera.eyeX = temparr[0]
    //     this.shownCanvasCamera.eyeZ = temparr[1]
    //     print("xzTheta:", xzTheta)
    //     this.debug()
    // }

    rotateLeft(step, hiddenCanvas) {
        let xzTheta = this.getCurrentXZAngle() + step
        let newpositionarr = this.getXZComponenetsForRotation(xzTheta)
        this.shownCanvasCamera.camera(newpositionarr[0], 0, newpositionarr[1])
        hiddenCanvas.camera(newpositionarr[0], 0, newpositionarr[1])
    }
    rotateRight(step, hiddenCanvas) {
        let xzTheta = this.getCurrentXZAngle() - step
        let newpositionarr = this.getXZComponenetsForRotation(xzTheta)
        this.shownCanvasCamera.camera(newpositionarr[0], 0, newpositionarr[1])
        hiddenCanvas.camera(newpositionarr[0], 0, newpositionarr[1])
    }

    // rotateRight(step) {
    //     let xzTheta = this.getCurrentXZAngle() - step
    //     let temparr = this.getXZComponenetsForRotation(xzTheta)
    //     this.shownCanvasCamera.eyeX = temparr[0]
    //     this.shownCanvasCamera.eyeZ = temparr[1]
    //     print("xzTheta:", xzTheta)
    //     this.debug()
    // }

    truckUp(step) {
        this.shownCanvasCamera.move(0, step, 0)
    }

    truckDown(step) {
        this.shownCanvasCamera.move(0, -step, 0)
    }

    truckRight(step) {
        this.shownCanvasCamera.move(step, 0, 0)
    }

    truckLeft(step) {
        this.shownCanvasCamera.move(-step, 0, 0)
    }

    panRight(step) {
        let xzTheta = this.getCurrentXZAngle() + 90 // to make a perpendicular angle
        let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
        this.centerX += temparr[0]
        this.centerZ += temparr[1]
        this.shownCanvasCamera.eyeX += temparr[0]
        this.shownCanvasCamera.eyeZ += temparr[1]
        this.debug()
    }

    panLeft(step) {
        let xzTheta = this.getCurrentXZAngle() - 90 // to make a perpendicular angle
        let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
        this.centerX += temparr[0]
        this.centerZ += temparr[1]
        this.shownCanvasCamera.eyeX += temparr[0]
        this.shownCanvasCamera.eyeZ += temparr[1]
        this.debug()
    }

    zoomOut(step) {
        this.shownCanvasCamera.eyeX /= step
        this.cameraY /= step
        this.shownCanvasCamera.eyeZ /= step
    }

    zoomIn(step) {
        this.shownCanvasCamera.eyeX *= step
        this.cameraY *= step
        this.shownCanvasCamera.eyeZ *= step
    }

    debug() {
        // sphere(100)
        print("distance:", dist(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeZ, this.centerX, this.centerZ))
        print("this.centerX: ", this.centerX)
        print("this.centerZ: ", this.centerZ)
        print("this.shownCanvasCamera.eyeX: ", this.shownCanvasCamera.eyeX)
        print("this.shownCanvasCamera.eyeZ: ", this.shownCanvasCamera.eyeZ)
        console.log()
        console.log()
    }

}