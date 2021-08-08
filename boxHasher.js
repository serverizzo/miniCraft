class BoxHasher {

    constructor() {
        // must start at 1, otherwise, it may be confused with the background
        let boxCounter = 1;
    }

    restartBoxCounter() {
        boxCounter = 1
    }

    getNextHash() {
        boxCounter += 1
        temp = boxCounter
        lastDigit = temp % 256
        temp = int(temp / 256)
        penultDigit = temp % 256
        temp = int(temp / 256)
        secondDigit = boxCounter % 256
        temp = int(temp / 256)
        firstDigit = boxCounter % 256
        // return String(firstDigit + "_" + secondDigit + "_" + penultDigit + "_" + lastDigit + "_")
        return [firstDigit, secondDigit, penultDigit, lastDigit]
    }

    getKey(arr) {
        return String(arr[0] + "_" + arr[1] + "_" + arr[2] + "_" + arr[3])
    }
}