
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
    }

    generateXZDistanceFromCenter() {
        return sqrt(sq(this.cameraX - this.centerX) + sq(this.cameraZ - this.centerZ))
    }

    // note: x should be the opposite side, z should be the adj side
    getCurrentXZAngle() {
        return atan2(this.cameraX, this.cameraZ)
    }

    // returns the new x and z componenets respectfully
    getXZComponenetsForRotation(theta) {
        return [sin(theta) * dist(this.cameraX, this.cameraZ, this.centerX, this.centerZ), cos(theta) * dist(this.cameraX, this.cameraZ, this.centerX, this.centerZ)]
        // return [sin(theta) * this.generateXZDistanceFromCenter(), cos(theta) * this.generateXZDistanceFromCenter()]
    }

    rotateLeft(step) {
        let xzTheta = this.getCurrentXZAngle() + step
        let temparr = this.getXZComponenetsForRotation(xzTheta)
        this.cameraX = temparr[0]
        this.cameraZ = temparr[1]
        print("xzTheta:", xzTheta)
        this.debug()
    }

    rotateRight(step) {
        let xzTheta = this.getCurrentXZAngle() - step
        let temparr = this.getXZComponenetsForRotation(xzTheta)
        this.cameraX = temparr[0]
        this.cameraZ = temparr[1]
        print("xzTheta:", xzTheta)
        this.debug()

    }


    panRight(step) {
        let xzTheta = this.getCurrentXZAngle() + 90 // to make a perpendicular angle
        let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
        this.centerX += temparr[0]
        this.centerZ += temparr[1]
        this.cameraX += temparr[0]
        this.cameraZ += temparr[1]
        this.debug()
    }

    panLeft(step) {


        let xzTheta = this.getCurrentXZAngle() - 90 // to make a perpendicular angle
        let temparr = [sin(xzTheta) * step, cos(xzTheta) * step]
        this.centerX += temparr[0]
        this.centerZ += temparr[1]
        this.cameraX += temparr[0]
        this.cameraZ += temparr[1]
        // this.debug()
    }

    zoomOut(step) {
        this.cameraX /= step
        this.cameraY /= step
        this.cameraZ /= step
    }

    zoomIn(step) {
        this.cameraX *= step
        this.cameraY *= step
        this.cameraZ *= step
    }

    debug() {
        // sphere(100)
        print("distance:", dist(this.cameraX, this.cameraZ, this.centerX, this.centerZ))
        print("this.centerX: ", this.centerX)
        print("this.centerZ: ", this.centerZ)
        print("this.cameraX: ", this.cameraX)
        print("this.cameraZ: ", this.cameraZ)
        console.log()
        console.log()
    }

}