// Executes sorting algorithm and determines the sequence of animations
export default function getBubbleAnimations(arr) {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                // Swap arr[j], arr[j + 1]
                animations.push([j, j + 1]);
            }
        }
    }
    return animations;
}


// Original bubble sort algorithm
// export function bubbleAlgo(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
//     return arr;
// }
