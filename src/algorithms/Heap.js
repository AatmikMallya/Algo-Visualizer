export default function getHeapAnimations(arr) {
    const animations = [];



    return animations;
}

function heapifyAnimate(arr, len, i) {

}


// Original heap sort algorithm
function heapify(arr, len, i) {
    let largest = i;
    const left = i * 2 + 1;
    const right = left + 1;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, len, largest);
    }
}

export function heapAlgo(arr) {
    const len = arr.length
    let i  = Math.floor(len / 2 - 1);
    // Last index of heap
    let j = len - 1;

    while (i >= 0) {
        heapify(arr, len, i);
        i--;
    }

    while (j >= 0) {
        [arr[0], arr[j]] = [arr[j], arr[0]];
        heapify(arr, j, 0);
        j--;
    }
    return arr;
}


