
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


    rotateLeft(step, hiddenCanvas) {
        let xzTheta = this.getCurrentXZAngle() + step
        let newpositionarr = this.getXZComponenetsForRotation(xzTheta)
        this.shownCanvasCamera.camera(newpositionarr[0], this.shownCanvasCamera.eyeY, newpositionarr[1])
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ, this.shownCanvasCamera.centerX, this.shownCanvasCamera.centerY, this.shownCanvasCamera.centerZ)
    }
    rotateRight(step, hiddenCanvas) {
        let xzTheta = this.getCurrentXZAngle() - step
        let newpositionarr = this.getXZComponenetsForRotation(xzTheta)
        this.shownCanvasCamera.camera(newpositionarr[0], this.shownCanvasCamera.eyeY, newpositionarr[1])
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ, this.shownCanvasCamera.centerX, this.shownCanvasCamera.centerY, this.shownCanvasCamera.centerZ)

    }


    truckUp(step, hiddenCanvas) {
        // this.shownCanvasCamera.eyeY -= step
        this.shownCanvasCamera.camera(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeY - step, this.shownCanvasCamera.eyeZ)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ, this.shownCanvasCamera.centerX, this.shownCanvasCamera.centerY, this.shownCanvasCamera.centerZ)
    }

    truckDown(step, hiddenCanvas) {
        this.shownCanvasCamera.camera(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeY + step, this.shownCanvasCamera.eyeZ)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ, this.shownCanvasCamera.centerX, this.shownCanvasCamera.centerY, this.shownCanvasCamera.centerZ)
    }

    truckRight(step, hiddenCanvas) {
        this.shownCanvasCamera.move(step, 0, 0)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ)
    }

    truckLeft(step, hiddenCanvas) {
        this.shownCanvasCamera.move(-step, 0, 0)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ, this.shownCanvasCamera.centerX, this.shownCanvasCamera.centerY, this.shownCanvasCamera.centerZ)
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

    zoomOut(step, hiddenCanvas) {
        this.shownCanvasCamera.camera(this.shownCanvasCamera.eyeX / step, this.shownCanvasCamera.eyeY / step, this.shownCanvasCamera.eyeZ / step)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ)
    }

    zoomIn(step, hiddenCanvas) {
        this.shownCanvasCamera.camera(this.shownCanvasCamera.eyeX * step, this.shownCanvasCamera.eyeY * step, this.shownCanvasCamera.eyeZ * step)
        hiddenCanvas.camera(this.shownCanvasCamera.eyeX, -(this.shownCanvasCamera.eyeY), this.shownCanvasCamera.eyeZ)
    }

    debug() {
        // sphere(100)
        // print("distance:", dist(this.shownCanvasCamera.eyeX, this.shownCanvasCamera.eyeZ, this.centerX, this.centerZ))
        print("this.centerX: ", this.centerX)
        print("this.centerZ: ", this.centerY)
        print("this.centerZ: ", this.centerZ)
        print("this.shownCanvasCamera.eyeX: ", this.shownCanvasCamera.eyeX)
        print("this.shownCanvasCamera.eyeY: ", this.shownCanvasCamera.eyeY)
        print("this.shownCanvasCamera.eyeZ: ", this.shownCanvasCamera.eyeZ)

        console.log()
        console.log()
    }

}