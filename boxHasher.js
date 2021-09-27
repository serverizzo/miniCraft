class BoxHasher {

    constructor() {
        // must start at 1, otherwise, it may be confused with the background
        this.boxCounter = 0;
        this.colorInUse = {}; // key is colors, value is boolean (true means that the color is being hovered over, false means it is not being hovered over)
    }

    restartBoxHasher() {
        this.boxCounter = 0
        // this.colorInUse = {} // make the dict empty again
    }

    getNextHash() {
        this.boxCounter += 1
        let temp = this.boxCounter
        let lastDigit = temp % 252 // mod 252 since this is the largest number divisible by 6 that is less than 255
        temp = int(temp / 252)
        let penultDigit = (temp % 252) + 1
        temp = int(temp / 252)
        let secondDigit = (temp % 252) + 1
        temp = int(temp / 252)
        let firstDigit = (temp % 252) + 1
        this.colorInUse[this.getKey([secondDigit, penultDigit, lastDigit])] = false // enter into dict
        // return String(firstDigit + "_" + secondDigit + "_" + penultDigit + "_" + lastDigit + "_")
        return [secondDigit, penultDigit, lastDigit]
    }

    getNextAssignedBoxKey() { // but do not increment the boxCounter
        let temp = this.boxCounter
        temp += 1
        let lastDigit = temp % 252 // mod 252 since this is the largest number divisible by 6 that is less than 255
        temp = int(temp / 252)
        let penultDigit = (temp % 252) + 1
        temp = int(temp / 252)
        let secondDigit = (temp % 252) + 1
        temp = int(temp / 252)
        let firstDigit = (temp % 252) + 1
        // return String(firstDigit + "_" + secondDigit + "_" + penultDigit + "_" + lastDigit + "_")
        return [Math.floor(secondDigit / 6), Math.floor(penultDigit / 6), Math.floor(lastDigit / 6)]
    }

    getKey(arr) { // arr is the color of the cube face
        return String(arr[0] + "_" + arr[1] + "_" + arr[2])
    }

    isColorInUse(arr) {
        // print("from is color in use: ", arr)
        // print("from is color in use: ", this.getKey(arr))
        return this.getKey(arr) in this.colorInUse && this.colorInUse[this.getKey(arr)] == true;
    }


}