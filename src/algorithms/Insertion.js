const purple = '#8a2be2';

// Executes sorting algorithm and determines the sequence of animations
export default function getInsertionAnimations(arr) {
    const animations = [];

    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const temp = arr[i];
        // arr[i] = purple
        animations.push([i, purple])
        while (j >= 0 && arr[j] > temp) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            // Swap arr[j], arr[j + 1]
            animations.push([j, j + 1])
            j--;
        }
    }

    console.log('get',animations)
    return animations;
}



// Original insertion algo
export function insertionAlgo(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const temp = arr[i];
        while (j >= 0 && arr[j] > temp) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
    }
    return arr;
}
