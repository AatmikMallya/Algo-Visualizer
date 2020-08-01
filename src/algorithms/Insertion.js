const purple = '#8a2be2';

export default function getInsertionAnimations(arr) {
    const animations = [];

    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const temp = arr[i];
        animations.push([i, purple])
        while (j >= 0 && arr[j] > temp) {
            const temp2 = arr[j+1]
            arr[j+1] = arr[j];
            arr[j] = temp2;
            animations.push([j, j + 1])
            j--;
        }
    }

    return animations;
}



// // Algo w/ more swapping for better visual
// export function insertionAlgo(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let j = i - 1;
//         const temp = arr[i];
//         while (j >= 0 && arr[j] > temp) {
//             const temp2 = arr[j+1]
//             arr[j+1] = arr[j];
//             arr[j] = temp2;
//             j--;
//         }
//     }
//     return arr;
// }

// // More efficient version - less swapping
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
