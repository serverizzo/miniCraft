class BoxHasher {

    constructor() {
        // must start at 1, otherwise, it may be confused with the background
        this.boxCounter = 1;
        this.colorDict = {};
    }

    restartBoxHasher() {
        this.boxCounter = 1
        this.colorDict = {} // make the arry empty again
    }

    getNextHash() {
        this.boxCounter += 1
        let temp = this.boxCounter
        let lastDigit = temp % 256
        temp = int(temp / 256)
        let penultDigit = temp % 256
        temp = int(temp / 256)
        let secondDigit = temp % 256
        temp = int(temp / 256)
        let firstDigit = temp % 256
        this.colorDict[this.getKey([secondDigit, penultDigit, lastDigit])] = true
        // return String(firstDigit + "_" + secondDigit + "_" + penultDigit + "_" + lastDigit + "_")
        return [secondDigit, penultDigit, lastDigit]
    }

    getKey(arr) { // arr is the color of the cube face
        return String(arr[0] + "_" + arr[1] + "_" + arr[2])
    }
    colorIsUsed(arr) {
        return this.getKey(arr) in this.colorDict;
    }
}