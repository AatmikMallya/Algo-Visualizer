// Executes sorting algorithm and determines the sequence of animations
export default function getCombAnimations(arr) {
    const animations = [];
    const interval = 1.3;
    let iteration = 0;
    let gap = arr.length - 2;
   
    while (!isSorted(arr)) {
        if (iteration) {
           gap = gap === 1 ? gap : Math.floor(gap / interval);
        }
   
        let front = 0;
        for (let back = gap; back <= arr.length - 1; back++) {
            if (arr[front] > arr[back]) {
                [arr[front], arr[back]] = [arr[back], arr[front]];
                // Swap arr[front], arr[back]
                animations.push([front, back]);
            }
            front++;
        }
        iteration++;
        animations.push(null)
    }

    return animations;
}



// Original comb sort algorithm
export function combAlgo(arr) {
    const interval = 1.3;
    let iteration = 0;
    let gap = arr.length - 2;
   
    while (!isSorted(arr)) {
        if (iteration) {
           gap = gap === 1 ? gap : Math.floor(gap / interval);
        }
   
        let front = 0;
        for (let back = gap; back <= arr.length - 1; back++) {
            if (arr[front] > arr[back]) {
                [arr[front], arr[back]] = [arr[back], arr[front]];
            }
            front++;
        }
        iteration++;
    }
    return arr;
}

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true;
}