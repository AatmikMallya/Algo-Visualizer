// Executes sorting algorithm and determines the sequence of animations
export default function getShellAnimations(arr) {
    const animations = [];

    const len = arr.length;
    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // New shell iteration
        for (let i = gap; i < len; i++) {
            const temp = arr[i];
            // arr[i] = purple
            animations.push([i]);
            for (let j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]];
                // Swap arr[j], arr[j - gap]
                animations.push([j - gap, j]);
            }
        }
    }
    
    return animations;
}


// Original shell algo w/ more swapping for better visual
// export function shellAlgo(arr) {
//     const len = arr.length;
//     for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
//         for (let i = gap; i < len; i++) {
//             const temp = arr[i];
//             for (let j = i; j >= gap && arr[j-gap] > temp; j -= gap) {
//                 [arr[j], arr[j-gap]] = [arr[j-gap], arr[j]];
//             }
//         }
//     }
//     return arr;
// }

// More efficient version - less swapping
// export function shellAlgo2(arr) {
//     const len = arr.length;
//     let gap = Math.floor(len / 2);
//     while (gap > 0) {
//         for (let i = gap; i < len; i++) {
//             const temp = arr[i];
//             let j = i;
//             while (j >= gap && arr[j-gap] > temp) {
//                 arr[j] = arr[j-gap];
//                 j -= gap;
//             }
//             arr[j] = temp;
//         }
//         gap = Math.floor(gap / 2);
//     }
//     return arr;
// }
