const purple = '#8a2be2';
const red = '#dc143c';

export default function getSelectionAnimations(arr) {
    let minIdx, temp;
    const animations = [];
    
    for (let i = 0; i < arr.length; i++) {
        minIdx = i;
        // arr[i] = purple
        animations.push([i, purple, 'sorted'])
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                // arr[j] = purple
                animations.push([j, purple])
            }
            else {
                // arr[j] = red
                animations.push([j, red])
            }
        }

        if (minIdx > i) {
            temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
            // Swap a[i], a[minIdx]
            animations.push([i, minIdx]);
        }
    }

    return animations;
}


// Original selection sort algorithm
// export function selectionAlgo(arr) {
//     let minIdx, temp;
    
//     for (let i = 0; i < arr.length; i++) {
//         minIdx = i;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] < arr[minIdx]) {
//                 minIdx = j;
//             }
//         }

//         if (minIdx > i) {
//             temp = arr[minIdx];
//             arr[minIdx] = arr[i];
//             arr[i] = temp;
//         }
//     }

//     return arr;
// }
