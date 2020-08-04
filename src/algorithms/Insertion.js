const purple = '#8a2be2';

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

    return animations;
}



// Original insertion algo w/ more swapping for better visual
// export function insertionAlgo(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let j = i - 1;
//         const temp = arr[i];
//         while (j >= 0 && arr[j] > temp) {
//             [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             j--;
//         }
//     }
//     return arr;
// }

// More efficient version - less swapping
// export function insertionAlgo2(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let j = i - 1;
//         const temp = arr[i];
//         while (j >= 0 && arr[j] > temp) {
//             arr[j+1] = arr[j];
//             j--;
//         }
//         arr[j+1] = temp;
//     }
//     return arr;
// }
